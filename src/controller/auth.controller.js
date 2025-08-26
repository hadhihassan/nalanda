import { asyncErrorHandler } from "../utils/async.utils.js";
import * as authService from "../services/auth.service.js";

// Handles member login.
export const loginUser = asyncErrorHandler(async (req, res) => {
    const { email, password } = req.body;
    const response = await authService.loginUser(email, password);
    return res.status(response.status).json(response.body);
});

// Handles admin login.
export const loginAdmin = asyncErrorHandler(async (req, res) => {
    const { email, password } = req.body;
    const response = await authService.loginAdmin(email, password);
    return res.status(response.status).json(response.body);
});

// Handles user registration.
export const registerUser = asyncErrorHandler(async (req, res) => {
    const { email, password } = req.body;
    const response = await authService.registerUser({ email, password, ...req.body });
    return res.status(response.status).json(response.body);
});
