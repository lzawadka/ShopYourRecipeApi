import { Request, Response } from 'express';
import { userRepositorie } from '../repositories/user_repositorie';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApiResponse } from '../models/ApiResponse';
import { IUser } from '../models/User/User';

export const getUserDetails = async (req: Request, res: Response) => {
    try {
			const userId = req.user;
			let user = await userRepositorie.getUserById(userId);
			if (user == null) {
				const response: ApiResponse<null> = { code: 404, message: "Utilisateur introuvable", data: null };
				return res.status(409).json(response);
			}

			const response: ApiResponse<IUser> = { code: 200, message: "Succès", data: user };
			res.status(200).json(response);
		
    } catch (err: any) {
			const response: ApiResponse<null> = { code: 500, message: "Erreur Serveur", data: null };
			res.status(500).json(response);
    }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
  } catch (err: any) {
    const response: ApiResponse<null> = { code: 500, message: "Erreur Serveur", data: null };
			res.status(500).json(response);
  }
}