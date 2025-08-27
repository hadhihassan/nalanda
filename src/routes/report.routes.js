import express from 'express';
import { verifyUser } from '../middleware/verifyUsers.js';
import { activeMembers, booksAvailabilityStatus, getMostBorrowedBooks } from '../controller/report.controller.js';

const routes = express.Router()

routes.get(
    "/most-borrow-books",
    verifyUser,
    (req, res, next) => {
        getMostBorrowedBooks(req, res);
    }
)

routes.get(
    "/active-user",
    verifyUser,
    (req, res, next) => {
        activeMembers(req, res);
    }
)

routes.get(
    "/books-availability",
    verifyUser,
    (req, res, next) => {
        booksAvailabilityStatus(req, res);
    }
)

export default routes