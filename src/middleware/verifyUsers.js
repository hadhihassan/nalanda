import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import mongoose from 'mongoose'
import { StatusCodes } from "http-status-codes";

// Middleware to verify a regular user
export async function verifyUser(req, res, next) {
    try {
        const token = req.headers.authorization;
        const userData = await verifyTokenAndGetUser(token);

        req.userId = userData._id;
        next();

    } catch (error) {
        return res
            .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message || "Internal Server Error" });
    }
}

// Middleware to verify a admin
export async function verifyAdmin(req, res, next) {
    try {
        const token = req.headers.authorization;
        const adminData = await verifyTokenAndGetUser(token);

        if (adminData.role !== "Admin") {
            return res
                .status(error.status || StatusCodes.UNAUTHORIZED)
                .json({ message: "Your not admin" });
        }

        req.adminId = adminData._id;
        next()
    } catch (error) {
        return res
            .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message || "Internal Server Error" });
    }
}

// Helper function to verify token and fetch user data
async function verifyTokenAndGetUser(token) {
    if (!token) throw { status: StatusCodes.UNAUTHORIZED, message: "Token not provided" };

    const decodedToken = jwt.verify(token.slice(7), process.env.JWT_SECRET_KEY);
    const objectId = new mongoose.Types.ObjectId(decodedToken.id);
    const userData = await User.findById(objectId);
    if (!userData) throw { status: StatusCodes.UNAUTHORIZED, message: "Invalid token" };

    return userData;
}