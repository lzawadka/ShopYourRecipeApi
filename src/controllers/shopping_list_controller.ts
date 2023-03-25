import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { shoppingListService } from '../repositories/shopping_list_repositorie';

export const createShoppingList = async (req: Request, res: Response) => {
    const { name, ingredients } = req.body;
    const userId = req.user.id;
    console.log(userId);

    const shoppingList = await shoppingListService.createShoppingList(userId, name, ingredients);

    res.status(201).json({ shoppingList });
}

export const getShoppingList = async (req: Request, res: Response) => {
    const user = req.user;
  
    const shoppingLists = await shoppingListService.getShoppingLists(user);
  
    res.json({ shoppingLists });
};

export const getShoppingListById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user;
  
    if (!Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Liste de courses non trouvée." });
    }
  
    const shoppingList = await shoppingListService.getShoppingListById(id, user);
  
    if (!shoppingList) {
      return res.status(404).json({ message: "Liste de courses non trouvée." });
    }
  
    res.json({ shoppingList });
  }

export const addIngredient =  async (req: Request, res: Response) => {
    try {
      const shoppingListId = req.params.id;
      const { name, category, quantity } = req.body;
      const user = req.user;
      console.log(shoppingListId);
  
      if (!Types.ObjectId.isValid(shoppingListId)) {
        return res.status(404).json({ message: "Liste de courses non trouvée." });
    }
      const shoppingList = await shoppingListService.addIngredientToList(user, shoppingListId, {name, category, quantity});
  
      return res.status(201).json(shoppingList);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  };

export const removeIngredient = async (req: Request, res: Response) => {
    const shoppingListId = req.params.id;
    const user = req.user;
    const ingredientId = req.body.ingredientId;

    console.log(ingredientId);

    if (!Types.ObjectId.isValid(shoppingListId)) {
        return res.status(404).json({ message: "Liste de courses non trouvée." });
    }

    const e =  await shoppingListService.deleteIngredientFromList(user, shoppingListId, ingredientId);

    return res.status(201).json(e);
};

export const deleteShoppingList = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.id;
    try {
      await shoppingListService.deleteShoppingList(userId!, id);
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred while deleting the shopping list" });
    }
};