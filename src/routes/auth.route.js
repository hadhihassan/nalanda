import express from 'express';
import { validateHandler } from '../middleware/validateHandler.js'
import { loginSchema, registerSchema } from '../dtos/auth.dtos.js';
import { loginUser, loginAdmin, registerUser } from '../controller/auth.controller.js'

const authRouter = express.Router()
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUser'
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Email already exists or validation error
 */
authRouter.post(
    "/register",
    registerSchema,
    validateHandler,
    (req, res, next) => {
        registerUser(req, res, next)
    }
);

authRouter.post(
    "/login",
    loginSchema,
    validateHandler,
    (req, res, next) => {
        loginUser(req, res, next)
    }
)
authRouter.post(
    "/admin/login",
    loginSchema,
    validateHandler,
    (req, res, next) => {
        loginAdmin(req, res, next)
    }
)

export default authRouter