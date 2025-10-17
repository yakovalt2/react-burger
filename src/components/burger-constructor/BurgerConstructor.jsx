import PropTypes from 'prop-types';
import styles from './BurgerConstructor.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = ({ ingredients }) => {
  const totalPrice = ingredients.reduce((sum, item) => sum + item.price, 0);

  return (
    <section className={styles.constructor}>
      <h2 className={styles.title}>Ваш бургер</h2>
      <ul className={styles.list}>
        {ingredients.map(item => (
          <li key={item._id} className={styles.item}>
            <img src={item.image} alt={item.name} className={styles.image} />
            <span className={styles.name}>{item.name}</span>
            <span className={styles.price}>
              {item.price} <CurrencyIcon type="primary" />
            </span>
          </li>
        ))}
      </ul>
      <div className={styles.total}>
        <span>Итого: {totalPrice}</span>
        <button className={styles.orderButton}>Оформить заказ</button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired
    })
  ).isRequired
};

export default BurgerConstructor;