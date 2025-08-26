import mongoose from "mongoose";
import { config } from "./env.config.js";

export const connectDatabase = () => {
    mongoose
        .connect(config.mongoUri)
        .then(() => {
            console.info("Database Status: \tConnected");
        })
        .catch((err) => console.error(err));
};