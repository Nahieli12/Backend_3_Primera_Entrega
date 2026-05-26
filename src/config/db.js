import mongoose from 'mongoose';
import { env } from './env.js';

export const connectDB = async () => {
    try {
        await mongoose.connect(env.mongoUrl);
        console.log("Mongo conectado perrito");
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
};