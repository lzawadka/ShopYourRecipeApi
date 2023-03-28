import { Schema, model, Document, Types } from "mongoose";

interface IIngredient {
  _id: Types.ObjectId;
  name: string;
  category: string;
  quantity: number;
}

const ingredientSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
});

export { IIngredient, ingredientSchema }