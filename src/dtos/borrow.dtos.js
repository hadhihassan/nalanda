import { body, param } from "express-validator";


const borrowBookIdValidation = [
    body('bookId')
        .notEmpty().withMessage('bookId is required'),
]

export const borrowIdValidation = [
    param('id')
        .notEmpty().withMessage('bookId is required'),
]

const returnDateValidation = [
    body('returnDate')
        .notEmpty().withMessage('Return date is required.')
        .isDate().withMessage('Invalid date format.')
        .custom((value) => {
            const today = new Date();
            const inputDate = new Date(value);
            if (inputDate < today) {
                throw new Error('Start date cannot be in the past.');
            }
            return true;
        }),
]

export const borrowSchema = [
    ...borrowBookIdValidation,
    ...returnDateValidation,
]