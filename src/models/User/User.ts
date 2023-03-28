import { Schema, model, Types } from 'mongoose';

interface IUser {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  shoppingList: Types.ObjectId;
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  shoppingList: { type: Schema.Types.ObjectId, ref: 'ShoppingList', unique: true }
});

const User = model<IUser>('User', userSchema);

export { IUser, User };