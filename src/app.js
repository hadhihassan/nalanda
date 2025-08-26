import express from "express";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";

import authRouter from "./routes/auth.route.js";

import { asyncErrorHandler } from "./utils/async.utils";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(asyncErrorHandler)

export default app;