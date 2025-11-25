import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../services/store";
import IngredientDetails from "../../components/ingredient-details/IngredientDetails";

const IngredientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const ingredients = useAppSelector((s) => s.ingredients.items);
  const ingredient = ingredients.find((i) => i._id === id);

  if (!ingredient) {
    return <p>Загрузка ингредиента...</p>; 
  }

  return <IngredientDetails ingredient={ingredient} />;
};

export default IngredientPage;
