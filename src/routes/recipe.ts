import express, { Request, Response } from 'express';
import { IRecipe, Recipe } from '../models/Recipe/Recipe';
import { User } from '../models/User/User';
import auth from '../middleware/auth';
import { ApiResponse } from '../models/ApiResponse';
import { createRecipe, getRecipeById, getRecipes } from '../controllers/recipe_controller';

const router = express.Router();

// Create a Recipe
router.post('/', auth, createRecipe);

router.get("/", auth, getRecipeById);

router.get("/:id", auth, getRecipes);

export { router as recipeRoutes };