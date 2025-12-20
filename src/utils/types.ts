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
export interface TOrder {
  _id: string;
  number: number;
  name: string;
  status: "done" | "pending" | "created";
  ingredients: string[];
  createdAt: string;
}

export type IngredientWithCount = TIngredient & {
  count: number;
};

export type TIngredientType = TIngredient["type"];