import { IUser, User } from "../models/User/User";
import bcrypt from "bcryptjs";

export const userService = {
  getUserById,
  getUserByMail,
  createUser
};

async function getUserById(userId: string): Promise<IUser | null> {
  const user = await User.findById(userId);
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