import { IRecipe, Recipe } from "../models/Recipe/Recipe";

export const recipeService = {
  getRecipeById,
  createRecipe,
  getRecipesForUser
};

async function getRecipeById(recipeId: string, userId: string): Promise<IRecipe | null> {
  const recipe = await Recipe.findOne({
    _id: recipeId,
    user: userId,
  });
  return recipe;
}

async function createRecipe(recipeToCreate: IRecipe, userId: string): Promise<void> {
    console.log(recipeToCreate)
    const { title, description, ingredients, steps } = recipeToCreate;
  
      const recipe = new Recipe({
        title,
        description,
        ingredients,
        steps,
        user: userId,
      });
  
      await recipe.save();
}

async function getRecipesForUser(userId: string): Promise<Array<IRecipe>> {
    return await Recipe.find({ user: userId });
}