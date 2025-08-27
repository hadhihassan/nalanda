import express from 'express';
import { validateHandler } from '..//middleware/validateHandler.js'
import { borrowSchema, borrowIdValidation } from '../dtos/borrow.dtos.js'
import { verifyUser } from '../middleware/verifyUsers.js'
import { borrowABook, borrowHistory, returnBook } from '../controller/borrow.controller.js';

const routes = express.Router()

routes.post(
    "/borrow",
    verifyUser,
    borrowSchema,
    validateHandler,
    (req, res, next) => {
        borrowABook(req, res);
    }
)

routes.patch(
    "/return/:id",
    verifyUser,
    borrowIdValidation,
    validateHandler,
    (req, res, next) => {
        returnBook(req, res);
    }
)

routes.get(
    "/borrow-history",
    verifyUser,
    (req, res, next) => {
        borrowHistory(req, res);
    }
)

export default routes