import express, { Request, Response } from "express";
import { getUserDetails, updateUser } from "../controllers/user_controller";
import auth from "../middleware/auth";

const router = express.Router();

router.get("/", auth, getUserDetails);
router.put("/", auth, updateUser);

export { router as userRoutes };
