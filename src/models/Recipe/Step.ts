import { Schema, model, Document } from "mongoose";

interface IStep {
    instruction: string;
    image?: string;
}

const stepSchema = new Schema({
    instruction: { type: String, required: true },
    image: { type: String },
});

export { IStep, stepSchema };