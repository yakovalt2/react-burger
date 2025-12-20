export interface TOrder {
  _id: string;
  number: number;
  name: string;
  status: "done" | "pending" | "created";
  ingredients: string[];
  createdAt: string;
}