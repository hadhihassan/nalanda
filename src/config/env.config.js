import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI || "mongodb://localhost:27017/defaultDB",
  jwtSecret: process.env.JWT_SECRET || "default_secret",
  jwtExpire: process.env.JWT_EXPIRE || "7d",
};
