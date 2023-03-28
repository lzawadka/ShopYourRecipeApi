import { Request, Response } from 'express';
import { userRepositorie } from '../repositories/user_repositorie';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApiResponse } from '../models/ApiResponse';
import { shoppingListRepositorie } from '../repositories/shopping_list_repositorie';

export const createUser = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
  
      // Vérifier si l'utilisateur existe déjà
      let user = await userRepositorie.getUserByMail(email);
      if (user) {
        return res.status(409).json({ code: 409, message: "Cet utilisateur existe déjà", data: null } as ApiResponse<null>);
      }
      // Créer un nouvel utilisateur
      user = await userRepositorie.createUser(req.body);
      const shoppingList =  await shoppingListRepositorie.createShoppingList(user._id);
      await userRepositorie.updateShoopingListUser(shoppingList._id, user._id);

      // Créer un token JWT
      const payload = {
        user: {
          id: user._id,
        },
      };
  
      jwt.sign(
        payload,
        process.env.JWT_SECRET || "",
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ code: 200, message: "Succès", data: token  } as ApiResponse<string>);
        }
      );
    } catch (err: any) {
      console.error(err.message);
      res.status(500).json({ code: 200, message: "Errur Serveur", data: null } as ApiResponse<null>);
    }
}

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await userRepositorie.getUserByMail(email);
    if (!user) {
      return res.status(400).json({ code: 400, message: "Identifiants invalides", data: null } as ApiResponse<null>);
    }

    // Vérifier si le mot de passe est correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ code: 400, message: "Identifiants invalides", data: null } as ApiResponse<null>);
    }

    // Créer un token JWT
    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || "",
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ code: 200, message: "Succès", data: token } as ApiResponse<string>);
      }
    );
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ code: 200, message: "Errur Serveur", data: null  } as ApiResponse<null>);
  }
}