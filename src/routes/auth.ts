import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User/User";
import { createUser, loginUser } from "../controllers/auth_controller";

const router = express.Router();

router.post("/register", createUser);

router.post("/login", loginUser);

export { router as authRoutes };
