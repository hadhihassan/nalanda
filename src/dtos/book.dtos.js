import { body, param } from "express-validator";

const titleValidation = [
    body("title")
        .trim()
        .notEmpty().withMessage("Title is required.")
        .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters long.')
];

const authorValidation = [
    body("author")
        .trim()
        .notEmpty().withMessage("Author is required")
];

const isbnValidation = [
    body("ISBN")
        .trim()
        .notEmpty().withMessage("ISBN is required")
        .isLength({ min: 10, max: 13 }).withMessage('ISBN must be between 10 and 13 digits long.')
];

const publicationDateValidation = [
    body("publicationDate")
        .notEmpty().withMessage('Publication date is required.')
        .isDate().withMessage('Invalid date format.')
        .custom((value) => {
            const today = new Date();
            const inputDate = new Date(value);
            if (inputDate > today) {
                throw new Error('Start date cannot be in the future.');
            }
            return true;
        })
];

const genreValidation = [
    body("genre")
        .trim()
        .notEmpty().withMessage("Genre is required")
];

const copiesValidation = [
    body("copies")
        .notEmpty().withMessage('Number of copies is required.')
        .isInt({ min: 1 }).withMessage('Number of copies must be a positive number.')
];
const idValidation = [
    param("id")
        .notEmpty().withMessage('ID is required.')
];

// Validation schema for books
export const booksSchema = [
    ...titleValidation,
    ...authorValidation,
    ...isbnValidation,
    ...publicationDateValidation,
    ...genreValidation,
    ...copiesValidation
];

// Validation schema for editing books
export const booksEditSchema = [
    ...idValidation,
];

// Validation schema for editing books
export const booksDeleteSchema = [
    ...idValidation,
];