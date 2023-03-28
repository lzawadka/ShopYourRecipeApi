import express, { Request, Response } from 'express';
import { IRecipe, Recipe } from '../models/Recipe/Recipe';
import { User } from '../models/User/User';
import auth from '../middleware/auth';
import { ApiResponse } from '../models/ApiResponse';
import { createRecipe, getRecipeById, getRecipes } from '../controllers/recipe_controller';

const router = express.Router();

// Create a Recipe
router.post('/', auth, createRecipe);

router.get("/", auth, getRecipes);

router.get("/:id", auth, getRecipeById);

export { router as recipeRoutes };