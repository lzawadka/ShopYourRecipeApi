import { ShoppingList, IShoppingList } from "../models/Shopping/ShoppingList";
import { IIngredient } from "../models/Recipe/Ingredient";
import { Types } from "mongoose";

export const shoppingListRepositorie = {
  createShoppingList: async (userId: Types.ObjectId): Promise<IShoppingList> => {
    const shoppingList = new ShoppingList({ userId: new Types.ObjectId(userId), ingredients: [] });
    return await shoppingList.save();
  },

  addIngredient: async (userId: string, ingredient: IIngredient): Promise<IShoppingList | null> => {
    const userIdObject = new Types.ObjectId(userId);
    const shoppingList = await ShoppingList.findOne({ userId: userIdObject }).populate('ingredients');
    if (shoppingList) {
      const existingIngredientIndex = shoppingList.ingredients.findIndex((ing) => ing.name === ingredient.name && ing.category === ingredient.category);
      if (existingIngredientIndex > -1) {
        // si l'ingrédient existe déjà, mettre à jour sa quantité
        shoppingList.ingredients[existingIngredientIndex].quantity += ingredient.quantity;
      } else {
        // sinon, ajouter l'ingrédient à la liste de courses
        shoppingList.ingredients.push(ingredient);
      }
      await shoppingList.save();
    }
    return shoppingList;
  },

  removeIngredient: async (userId: string, ingredientId: string): Promise<IShoppingList> => {
    try {
      const ingredientIdObject = new Types.ObjectId(ingredientId);
      const userIdObject = new Types.ObjectId(userId);
      const shoppingList = await ShoppingList.findOne({ userId: userIdObject }).populate('ingredients');
      if (shoppingList) {
        const index = shoppingList.ingredients.findIndex(ingredient => ingredient._id.equals(ingredientIdObject));
        if (index !== -1) {
          shoppingList.ingredients.splice(index, 1);
          await shoppingList.save();
          return shoppingList;
        } else {
          throw new Error('Ingredient not found in shoppingList');
        }
      } else {
        throw new Error('ShoppingList not found');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Unable to remove ingredient');
    }
  },

  removeIngredientQuantity: async (userId: string, ingredientId: string): Promise<IShoppingList> => {
    try {
      const ingredientIdObject = new Types.ObjectId(ingredientId);
      const userIdObject = new Types.ObjectId(userId);
      const shoppingList = await ShoppingList.findOne({ userId: userIdObject }).populate('ingredients');
      if (shoppingList) {
        const ingredientIndex = shoppingList.ingredients.findIndex(ingredient => ingredient._id.equals(ingredientIdObject));
        console.log(ingredientIndex);
        if (ingredientIndex === -1) {
          throw new Error('Ingredient not found');
        }
        const ingredient = shoppingList.ingredients[ingredientIndex];
        ingredient.quantity -= 1;
        await shoppingList.save();
        return shoppingList;
      } else {
        throw new Error('ShoppingList not found');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Unable to remove ingredient');
    }
  },

  getUserShoppingList: async (userId: string): Promise<IShoppingList | null> => {
    const userIdObject = new Types.ObjectId(userId);
    const shoppingList = await ShoppingList.findOne({ userId: userIdObject }).populate('ingredients');
    return shoppingList;
  },
};
