import { IUser, User } from "../models/User/User";
import bcrypt from "bcryptjs";
import { ObjectId, Types } from "mongoose";

export const userRepositorie = {
  getUserById,
  getUserByMail,
  createUser,
  updateShoopingListUser
};

async function getUserById(userId: string): Promise<IUser | null> {
  let userIdObject = new Types.ObjectId(userId);
  const user = await User.findById(userIdObject);
  return user;
}

async function createUser(user: IUser): Promise<IUser> {
  const { firstName, lastName, email, password } = user;

  // Créer un nouvel utilisateur
  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
  });

  // Hasher le mot de passe avant de le sauvegarder
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(password, salt);

  await newUser.save();
  return newUser.toObject() as IUser
}

async function getUserByMail(email: string): Promise<IUser | null>{
  const user = await User.findOne({email});
  return user;
}

async function updateShoopingListUser(shoppingListId: Types.ObjectId, userId: Types.ObjectId): Promise<void> {
  const user = await User.findById(userId);
  if (user) {
    user.shoppingList = shoppingListId;
    await user.save();
  } else {
    throw new Error('User not found');
  }
}