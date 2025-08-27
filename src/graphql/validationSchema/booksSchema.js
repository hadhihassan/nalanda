import Joi from 'joi';

const titleValidation = Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
        'string.empty': 'Title is required.',
        'string.min': 'Title must be between 3 and 100 characters long.',
        'string.max': 'Title must be between 3 and 100 characters long.'
    });
const authorValidation = Joi.string()
    .trim()
    .required()
    .messages({
        'string.empty': 'Author is required.'
    });
const isbnValidation = Joi.string()
    .trim()
    .min(10)
    .max(13)
    .required()
    .messages({
        'string.empty': 'ISBN is required.',
        'string.min': 'ISBN must be between 10 and 13 digits long.',
        'string.max': 'ISBN must be between 10 and 13 digits long.'
    });
const publicationDateValidation = Joi.date()
    .required()
    .max('now')
    .messages({
        'date.base': 'Invalid date format.',
        'date.max': 'Start date cannot be in the future.',
        'any.required': 'Publication date is required.'
    });
const genreValidation = Joi.string()
    .trim()
    .required()
    .messages({
        'string.empty': 'Genre is required.'
    });
const idValidation = Joi.string()
    .required()
    .messages({
        'string.empty': 'ID is required.'
    });
const copiesValidation = Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
        'number.base': 'Number of copies must be a number.',
        'number.min': 'Number of copies must be a positive number.',
        'any.required': 'Number of copies is required.'
    });



// Books Schema
export const booksSchema = Joi.object({
    title: titleValidation,
    author: authorValidation,
    ISBN: isbnValidation,
    publicationDate: publicationDateValidation,
    genre: genreValidation,
    copies: copiesValidation
});

//ALter books schema
export const booksAlterSchema = Joi.object({
    id: idValidation,
    title: titleValidation,
    author: authorValidation,
    ISBN: isbnValidation,
    publicationDate: publicationDateValidation,
    genre: genreValidation,
    copies: copiesValidation
});

export const deleteBookSchema = Joi.object({
    id: idValidation,
})