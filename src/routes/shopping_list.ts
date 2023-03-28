import express, { Request, Response } from 'express';
import { getShoppingList, addIngredient, removeIngredient, removeIngredientQuantity } from '../controllers/shopping_list_controller';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/', auth,  getShoppingList);
router.post('/ingredient', auth, addIngredient);
router.delete('/ingredient/:id', auth, removeIngredient);
router.delete('/ingredient/:id/removequantity', auth, removeIngredientQuantity);

export { router as shoppingListRoutes }