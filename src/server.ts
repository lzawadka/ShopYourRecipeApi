require('dotenv').config({path:'./config.env'});

import express from "express";
import { connectDB } from "./config/db";
import { authRoutes } from "./routes/auth";
import { recipeRoutes } from "./routes/recipe";
import {shoppingListRoutes} from './routes/shopping_list';

const cors =  require('cors');

const app= express();
const PORT= process.env.PORT || 8080;

//connect to db
connectDB()

app.use(express.json());
app.use(cors({ origin: 'http://localhost:51548' }))

app.use('/api/auth', authRoutes);
app.use('/api/recipe', recipeRoutes);
app.use('/api/shopping-list', shoppingListRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "404 - Not Found" });
});

app.listen(
    PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
    }
)