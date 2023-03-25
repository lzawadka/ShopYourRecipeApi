import { Request, Response } from 'express';
import { ApiResponse } from '../models/ApiResponse';
import { IRecipe } from '../models/Recipe/Recipe';
import { recipeService } from '../repositories/recipe_repositorie';
import {userService} from '../repositories/user_repositorie';

export const createRecipe = async (req: Request, res: Response) => {
    try {
      const user = await userService.getUserById(req.user.id);
      if (!user) {
        return res.status(401).json({ msg: 'Utilisateur non autorisé' });
      }
  
      recipeService.createRecipe(req.body, req.user.id)

      res.json({ code: 200, message: "Succès", data: null } as ApiResponse<null>);
    } catch (err: any) {
      console.error(err.message);
      res.status(500).json({ code: 500, message: "Erreur serveur", data: null} as ApiResponse<null>);
    }
}

export const getRecipeById = async (req: Request, res: Response) => {
    try {
      const recipe = await recipeService.getRecipeById(req.params.id, req.user?.id);
  
      if (!recipe) {
        return res.status(404).json({ code: 404, message: "Recette non trouvée", data: null} as ApiResponse<null>);
      }
      res.json({ code: 200, message: "Succès", data: recipe } as ApiResponse<IRecipe>);
    } catch (err: any) {
      console.error(err.message);
      res.status(500).json({ code: 500, message: "Erreur serveur", data: null} as ApiResponse<null>);
    }
  };

export const getRecipes = async (req: Request, res: Response) => {
    try {
      // Récupérer les recettes de l'utilisateur connecté
      const recipes = await recipeService.getRecipesForUser(req.user.id);
  
      res.json({ code: 200, message: "Succès", data: recipes} as ApiResponse<Array<IRecipe>>);
    } catch (err: any) {
      console.error(err.message);
      res.status(500).json({ code: 500, message: "Erreur serveur", data: null} as ApiResponse<null>);
    }
};