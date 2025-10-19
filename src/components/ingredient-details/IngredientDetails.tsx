import React from 'react';
import styles from './ingredient-details.module.css';
import { TIngredient } from '../../utils/types';
import PropTypes from 'prop-types';

type Props = {
  ingredient: TIngredient;
};

const IngredientDetails: React.FC<Props> = ({ ingredient }) => {
  return (
    <div className={styles.container}>
      <img src={ingredient.image_large} alt={ingredient.name} className={styles.image} />
      <h3 className="text text_type_main-medium mt-4 mb-8">{ingredient.name}</h3>
      <ul className={styles.nutrition}>
        <li>
          <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
};

export default IngredientDetails;

IngredientDetails.propTypes = {
  ingredient: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
  }).isRequired,
};
