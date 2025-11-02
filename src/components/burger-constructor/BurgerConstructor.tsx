import styles from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../utils/types";
import React from "react";
import Modal from "../modal/Modal";
import OrderDetails from "../order-details/OrderDetails";
import { useDrop } from "react-dnd";
import { useAppDispatch, useAppSelector } from "../../services/store";
import {
  addIngredient,
  removeIngredient,
  setBun,
} from "../../services/slices/constructorSlice";
import {
  incrementCount,
  decrementCount,
} from "../../services/slices/IngredientsSlice";

type Props = {
  ingredients?: TIngredient[];
};

const BurgerConstructor: React.FC<Props> = ({ ingredients }) => {
  const dispatch = useAppDispatch();
  const constructor = useAppSelector((state) => state.burgerConstructor);
  const allIngredients = useAppSelector((state) => state.ingredients.items);

  const bun = constructor.bun;
  const mains = constructor.items;

  const totalPrice =
    (bun ? bun.price * 2 : 0) + mains.reduce((sum, i) => sum + i.price, 0);

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

  const [isOrderOpen, setIsOrderOpen] = React.useState(false);

  return (
    <section className={styles.burgerConstructor} ref={dropRef as any}>
      <div className={styles.items}>
        {bun && (
          <div className={`${styles.bun} mb-4 ml-8`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}

        <ul className={`${styles.scrollArea} custom-scroll`}>
          {mains.map((item) => (
            <li key={item.uid ?? item._id} className={styles.item}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => handleRemove(item.uid ?? item._id, item)}
              />
            </li>
          ))}
        </ul>

        {bun && (
          <div className={`${styles.bun} mt-4 ml-8`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
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
          onClick={() => setIsOrderOpen(true)}
        >
          Оформить заказ
        </Button>
      </div>

      {isOrderOpen && (
        <Modal onClose={() => setIsOrderOpen(false)}>
          <OrderDetails orderNumber={12345} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
