import { Schema, model, Document } from "mongoose";
import { IIngredient, ingredientSchema } from "./Ingredient";
import { IStep, stepSchema } from "./Step";

interface IRecipe extends Document {
    title: string;
    description: string;
    ingredients: IIngredient[];
    steps: IStep[];
    user: string;
}

const recipeSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [ingredientSchema],
    steps: [stepSchema],
    user: { type: Schema.Types.ObjectId, ref: "User" },
});

const Recipe = model<IRecipe>("Recipe", recipeSchema);

export { Recipe, IRecipe }