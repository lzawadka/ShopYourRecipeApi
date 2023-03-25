import { Document, model, ObjectId, Schema, Types } from "mongoose";
import { IIngredient } from "../Recipe/Ingredient";

export interface IShoppingList extends Document {
  user: string;
  name: string;
  ingredients: IIngredient[];
}

const shoppingListSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  ingredients:  [{ name: String, category: String }]
});

export const ShoppingList = model<IShoppingList>(
  "ShoppingList",
  shoppingListSchema
);