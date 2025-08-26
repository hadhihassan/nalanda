import express from "express";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;