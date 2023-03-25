import { ShoppingList, IShoppingList } from "../models/Shopping/ShoppingList";
import { IIngredient } from "../models/Recipe/Ingredient";
import { Types } from "mongoose";

export const shoppingListService = {
  createShoppingList: async (userId: string, name: string, ingredients: IIngredient[]): Promise<IShoppingList> => {
    const shoppingList = new ShoppingList({
        user: userId, // Associe la liste de courses à l'utilisateur courant
        name,
        ingredients: ingredients
      })
    return shoppingList.save();
  },
  getShoppingLists: async (userId: string): Promise<IShoppingList[]> => {
    return ShoppingList.find({ user: new Types.ObjectId(userId) }).exec();
  },
  getShoppingListById: async (userId: string, shoppingListId: string): Promise<IShoppingList[]> => {
    return ShoppingList.find({ user: new Types.ObjectId(userId), _id: shoppingListId }).exec();
  },
  addIngredientToList: async (
    userId: string,
    shoppingListId: string,
    ingredient: IIngredient
  ): Promise<IShoppingList> => {
    const shoppingList = await ShoppingList.findOneAndUpdate(
      { _id: shoppingListId, user: new Types.ObjectId(userId) },
      { $push: { ingredients: ingredient } },
      { new: true }
    ).exec();
    if (!shoppingList) {
      throw new Error("Shopping list not found");
    }
    return shoppingList;
  },
  deleteIngredientFromList: async (
    userId: string,
    shoppingListId: string,
    ingredientId: string
  ): Promise<IShoppingList> => {
    const shoppingList = await ShoppingList.findOneAndUpdate(
      { _id: shoppingListId, user: new Types.ObjectId(userId) },
      { $pull: { ingredients: { _id: ingredientId } } },
      { new: true }
    ).exec();
    if (!shoppingList) {
      throw new Error("Shopping list not found");
    }
    return shoppingList;
  },
  deleteShoppingList: async (userId: string, shoppingListId: string): Promise<void> => {
    const shoppingList = await ShoppingList.findOneAndDelete({ _id: shoppingListId, user: new Types.ObjectId(userId) }).exec();
    if (!shoppingList) {
      throw new Error("Shopping list not found");
    }
  },
};
