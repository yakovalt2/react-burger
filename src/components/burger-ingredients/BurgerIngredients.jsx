import PropTypes from 'prop-types';
import { Counter, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';

const BurgerIngredients = ({ ingredients }) => {
  const buns = ingredients.filter(item => item.type === 'bun');
  const sauces = ingredients.filter(item => item.type === 'sauce');
  const mains = ingredients.filter(item => item.type === 'main');

  return (
    <section className={styles.container}>
      <h2 className="text text_type_main-large">Соберите бургер</h2>

      <div className={styles.tabs}>
        <Tab value="bun" active={true}>Булки</Tab>
        <Tab value="sauce" active={false}>Соусы</Tab>
        <Tab value="main" active={false}>Начинки</Tab>
      </div>

      <div className={styles.ingredients}>
        <h3 className="text text_type_main-medium">Булки</h3>
        <div className={styles.items}>
          {buns.map(item => (
            <div key={item._id} className={styles.item}>
              <img src={item.image} alt={item.name} className={styles.image} />
              <p className="text text_type_main-default">{item.name}</p>
              <Counter count={1} size="default" />
            </div>
          ))}
        </div>

        <h3 className="text text_type_main-medium">Соусы</h3>
        <div className={styles.items}>
          {sauces.map(item => (
            <div key={item._id} className={styles.item}>
              <img src={item.image} alt={item.name} className={styles.image} />
              <p className="text text_type_main-default">{item.name}</p>
              <Counter count={0} size="default" />
            </div>
          ))}
        </div>

        <h3 className="text text_type_main-medium">Начинки</h3>
        <div className={styles.items}>
          {mains.map(item => (
            <div key={item._id} className={styles.item}>
              <img src={item.image} alt={item.name} className={styles.image} />
              <p className="text text_type_main-default">{item.name}</p>
              <Counter count={0} size="default" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
    })
  ).isRequired
};

export default BurgerIngredients;