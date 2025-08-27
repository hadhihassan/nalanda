import express from 'express';
import { booksDeleteSchema, booksEditSchema, booksSchema } from '../dtos/book.dtos.js'
import { validateHandler } from '..//middleware/validateHandler.js'
import { verifyAdmin, verifyUser } from '../middleware/verifyUsers.js'
import { listAllBooks, createBook, deleteBook, editBook } from '../controller/book.controller.js';

const routes = express.Router()

routes.get(
    "/books",
    verifyUser,
    (req, res, next) => {
        listAllBooks(req, res, next)
    }
)

routes.post(
    "/books",
    verifyAdmin,
    booksSchema,
    validateHandler,
    (req, res, next) => {
        createBook(req, res, next)
    }
)

routes.delete(
    "/books/:id",
    verifyAdmin,
    booksDeleteSchema,
    validateHandler,
    (req, res, next) => {
        deleteBook(req, res, next)
    }
)

routes.patch(
    "/books/:id",
    verifyAdmin,
    booksEditSchema,
    validateHandler,
    (req, res, next) => {
        editBook(req, res, next)
    }
)

export default routes;