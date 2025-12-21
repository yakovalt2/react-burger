import styles from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../utils/types";
import React, { useRef } from "react";
import Modal from "../modal/Modal";
import OrderDetails from "../order-confirmation/OrderConfirmation";
import { useDrop, useDrag, DropTargetMonitor } from "react-dnd";
import { XYCoord } from "dnd-core";
import { useAppDispatch, useAppSelector } from "../../services/store";
import {
  addIngredient,
  removeIngredient,
  setBun,
  moveIngredient,
} from "../../services/slices/constructorSlice";
import {
  incrementCount,
  decrementCount,
} from "../../services/slices/IngredientsSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/constants";
import { WS_URL } from "../../utils/constants";

const BurgerConstructor: React.FC = () => {
  const dispatch = useAppDispatch();
  const constructor = useAppSelector((state) => state.burgerConstructor);

  const bun = constructor.bun;
  const mains = constructor.items;

  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const totalPrice = React.useMemo(() => {
    return (
      (bun ? bun.price * 2 : 0) + mains.reduce((sum, i) => sum + i.price, 0)
    );
  }, [bun, mains]);

  const [, dropRef] = useDrop(
    () => ({
      accept: "ingredient",
      drop: (item: TIngredient) => {
        if (item.type === "bun") {
          if (bun) {
            if (bun._id === item._id) return;
            dispatch(decrementCount(bun._id));
            dispatch(decrementCount(bun._id));
          }
          dispatch(setBun({ ...item, count: 2 }));
          dispatch(incrementCount(item._id));
          dispatch(incrementCount(item._id));
        } else {
          dispatch(addIngredient({ ...item, count: 1 }));
          dispatch(incrementCount(item._id));
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [bun, dispatch]
  );

  const handleRemove = (uidOrIndex: string | number, item: TIngredient) => {
    dispatch(removeIngredient(uidOrIndex));
    dispatch(decrementCount(item._id));
  };

  const moveItem = (fromIndex: number, toIndex: number) => {
    dispatch(moveIngredient({ fromIndex, toIndex }));
  };

  const RenderIngredient = ({
    item,
    index,
  }: {
    item: (typeof mains)[0];
    index: number;
  }) => {
    const ref = useRef<HTMLLIElement>(null);

    const [, drop] = useDrop<
      {
        index: number;
      },
      void,
      { isOver: boolean }
    >({
      accept: "constructor-item",
      hover(draggedItem, monitor) {
        if (!ref.current) return;
        const dragIndex = draggedItem.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) return;

        const hoverBoundingRect = ref.current.getBoundingClientRect();
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY =
          (clientOffset as XYCoord).y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

        moveItem(dragIndex, hoverIndex);
        draggedItem.index = hoverIndex;
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    });

    const [{ isDragging }, drag] = useDrag({
      type: "constructor-item",
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    drag(drop(ref));

    return (
      <li
        ref={ref}
        className={`${styles.item} ${isDragging ? styles.itemDragging : ""}`}
        key={item.uid ?? item._id}
      >
        <DragIcon type="primary" />
        <ConstructorElement
          text={item.name}
          price={item.price}
          thumbnail={item.image}
          handleClose={() => handleRemove(item.uid ?? item._id, item)}
        />
      </li>
    );
  };

  const [isOrderOpen, setIsOrderOpen] = React.useState(false);
  const [orderNumber, setOrderNumber] = React.useState<number | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleOrderClick = async () => {
    let token = auth.accessToken || localStorage.getItem("accessToken");

    if (!auth.user || !token) {
      navigate("/login", { state: { from: location } });
      return;
    }

    if (!bun) return;

    const ingredientIds = [bun._id, ...mains.map((i) => i._id), bun._id];

    try {
      setIsLoading(true);
      setError(null);

      const token = localStorage.getItem("accessToken");

      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `${token}` } : {}),
        },
        body: JSON.stringify({ ingredients: ingredientIds }),
      });

      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}`);
      }

      const data: { success: boolean; order: { number: number } } = await response.json();

      setOrderNumber(data.order.number);
      setIsOrderOpen(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("Ошибка оформления заказа:", err);
      } else {
        setError("Ошибка оформления заказа");
        console.error("Неизвестная ошибка:", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.burgerConstructor} ref={dropRef as any}>
      <div className={styles.items}>
        {bun && (
          <div className={`${styles.bun} mb-4 ml-8`}>
            <ConstructorElement
              type="top"
              isLocked
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}

        <ul className={`${styles.scrollArea} custom-scroll`}>
          {mains.map((item, index) => (
            <RenderIngredient
              key={item.uid ?? item._id}
              item={item}
              index={index}
            />
          ))}
        </ul>

        {bun && (
          <div className={`${styles.bun} mt-4 ml-8`}>
            <ConstructorElement
              type="bottom"
              isLocked
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
      </div>

      <div className={styles.total}>
        <div className={styles.price}>
          <span className="text text_type_digits-medium">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleOrderClick}
          disabled={isLoading || !bun}
        >
          {isLoading ? "Оформляем..." : "Оформить заказ"}
        </Button>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {isOrderOpen && orderNumber && (
        <Modal onClose={() => setIsOrderOpen(false)}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
