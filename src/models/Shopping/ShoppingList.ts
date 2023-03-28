import { Document, model, ObjectId, Schema, Types } from "mongoose";
import { IIngredient, ingredientSchema } from "../Recipe/Ingredient";

interface IShoppingList extends Document {
  _id: Types.ObjectId;
  userId: string;
  ingredients: IIngredient[];
}

const shoppingListSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  ingredients: [ingredientSchema],
});

const ShoppingList = model<IShoppingList>('ShoppingList', shoppingListSchema);

export { IShoppingList, ShoppingList };