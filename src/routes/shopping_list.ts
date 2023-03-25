import express, { Request, Response } from 'express';
import { getShoppingList, addIngredient, removeIngredient, getShoppingListById, createShoppingList, deleteShoppingList } from '../controllers/shopping_list_controller';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/', auth,  getShoppingList);
router.post('/', auth, createShoppingList);
router.get('/:id', auth, getShoppingListById);
router.post('/:id/ingredients', auth, addIngredient);
router.delete('/:id/ingredient', auth, removeIngredient);
router.delete('/:id', auth, deleteShoppingList);

export { router as shoppingListRoutes }