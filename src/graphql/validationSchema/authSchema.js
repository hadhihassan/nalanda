import Joi from 'joi';

// Login validation schema
export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email format',
        'any.required': 'Email is required',
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required',
    }),
});

// Register validation schema
export const registerSchema = Joi.object({
    name: Joi.string().trim().min(3).required().messages({
        'string.min': 'Name must be at least 3 characters long',
        'any.required': 'Name is required',
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email format',
        'any.required': 'Email is required',
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required',
    }),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
        'any.only': 'Password confirmation does not match password',
    }),
});