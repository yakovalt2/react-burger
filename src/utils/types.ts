export type TIngredient = {
  _id: string;
  name: string;
  type: "bun" | "sauce" | "main";
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
};

export type IngredientWithCount = TIngredient & {
  count: number;
};

export type TIngredientType = TIngredient["type"];