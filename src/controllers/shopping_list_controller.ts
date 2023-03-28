import { Request, Response } from 'express';
import { ApiResponse } from '../models/ApiResponse';
import { IIngredient } from '../models/Recipe/Ingredient';
import { IShoppingList } from '../models/Shopping/ShoppingList';
import { shoppingListRepositorie } from '../repositories/shopping_list_repositorie';

export const getShoppingList = async (req: Request, res: Response) => {
    const user = req.user;
  
    const shoppingLists = await shoppingListRepositorie.getUserShoppingList(user);
    if(shoppingLists === null) {
        return res.status(404).json({code: 404, message: "Aucune liste de course trouvée", data: null} as ApiResponse<null>)
    }
  
    res.json({ code: 200, message: "Succès", data: shoppingLists } as ApiResponse<IShoppingList>);
};

export const addIngredient =  async (req: Request, res: Response) => {
    try {
      const ingredient: IIngredient = Object.assign({}, req.body)
      const user = req.user;
      const shoppingList = await shoppingListRepositorie.addIngredient(user, ingredient);
  
      return res.status(201).json({ code: 201, message: "Succès", data: shoppingList } as ApiResponse<IShoppingList>);
    } catch (error) {
      console.error(error);
      return res.status(500).json({code: 500, message: "Aucune liste de course trouvée", data: null} as ApiResponse<null>);
    }
};

export const removeIngredient = async (req: Request, res: Response) => {
    const user = req.user;
    const ingredientId = req.params.id;

    await shoppingListRepositorie.removeIngredient(user, ingredientId);

    return res.status(201).json({ code: 201, message: "Succès", data: null } as ApiResponse<null>);
};

export const removeIngredientQuantity = async (req: Request, res: Response) => {
    const user = req.user;
    const ingredientId = req.params.id;

    await shoppingListRepositorie.removeIngredientQuantity(user, ingredientId);

    return res.status(201).json({ code: 201, message: "Succès", data: null } as ApiResponse<null>);
};