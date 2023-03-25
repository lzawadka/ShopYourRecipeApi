import { Schema, model, Document } from "mongoose";

interface IIngredient {
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