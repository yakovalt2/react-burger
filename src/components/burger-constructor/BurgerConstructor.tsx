import styles from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../utils/types";
import React, { useState } from "react";
import Modal from "../modal/Modal";
import OrderDetails from "../order-details/OrderDetails";

type Props = {
  ingredients: TIngredient[];
};

const BurgerConstructor: React.FC<Props> = ({ ingredients }) => {
  const bun = ingredients.find((i) => i.type === "bun");
  const mains = ingredients.filter(
    (i) => i.type === "main" || i.type === "sauce"
  );

  const [isOrderOpen, setIsOrderOpen] = useState(false);

  return (
    <section className={styles.burgerConstructor}>
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
            <li key={item._id} className={styles.item}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
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
          <span className="text text_type_digits-medium">610</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={() => setIsOrderOpen(true)}>
          Оформить заказ
        </Button>
      </div>

      {isOrderOpen && (
        <Modal onClose={() => setIsOrderOpen(false)}>
          <OrderDetails orderNumber={12345}/>
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;