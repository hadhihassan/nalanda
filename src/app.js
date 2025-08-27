import express from "express";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";

import { asyncErrorHandler } from "./utils/async.utils.js";

import authRouter from "./routes/auth.route.js";
import booksRouter from "./routes/books.routes.js";
import borrowRoutes from "./routes/borrow.routes.js";
import reportRoutes from "./routes/report.routes.js";
import { connectDatabase } from "./config/db.config.js";
import { config } from "./config/env.config.js";
import schema from "./graphql/schema.js";


dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GraphQL Endpoint
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.use(authRouter)
app.use(booksRouter)
app.use(borrowRoutes)
app.use(reportRoutes)

app.use(asyncErrorHandler)


app.listen(config.port, (res) => {
    console.log(`Server Status: \t\tRunning on http://localhost:${config.port}`);
    connectDatabase();
});