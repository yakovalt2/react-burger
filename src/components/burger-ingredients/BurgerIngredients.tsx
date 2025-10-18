import React from 'react';
import styles from './BurgerIngredients.module.css';
import { Tab, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from '../../utils/types';

type Props = {
  ingredients: TIngredient[];
};

const BurgerIngredients: React.FC<Props> = ({ ingredients }) => {
  const [current, setCurrent] = React.useState('bun');

  const buns = ingredients.filter(item => item.type === 'bun');
  const sauces = ingredients.filter(item => item.type === 'sauce');
  const mains = ingredients.filter(item => item.type === 'main');

  return (
    <section className={styles.burgerIngredients}>
      <h1 className={styles.title}>Соберите бургер</h1>

      <div className={styles.tabs}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      <div className={styles.scrollArea}>
        <IngredientGroup title="Булки" items={buns} />
        <IngredientGroup title="Соусы" items={sauces} />
        <IngredientGroup title="Начинки" items={mains} />
      </div>
    </section>
  );
};

type GroupProps = {
  title: string;
  items: TIngredient[];
};

const IngredientGroup: React.FC<GroupProps> = ({ title, items }) => (
  <div className={styles.group}>
    <h2 className={styles.groupTitle}>{title}</h2>
    <div className={styles.grid}>
      {items.map(item => {
        const count = 0;
        return (
          <div key={item._id} className={styles.card}>
            {count > 0 && <Counter count={count} size="default" extraClass={styles.counter} />}
            <img src={item.image} alt={item.name} className={styles.image} />
            <div className={styles.price}>
              <span className={styles.priceValue}>{item.price}</span>
              <CurrencyIcon type="primary" />
            </div>
            <p className={styles.name}>{item.name}</p>
          </div>
        );
      })}
    </div>
  </div>
);
export default BurgerIngredients;