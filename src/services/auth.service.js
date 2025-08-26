import { StatusCodes } from "http-status-codes";
import { generateJwtToken } from "../utils/jwt.utils.js";
import User from "../models/user.models.js";
import { comparePasswords, convertSecurePassword } from "../utils/bcrypt.utils.js";

export const loginUser = async (email, password) => {
    const logedUser = await User.findOne({ email });
    if (!logedUser) {
        return {
            status: StatusCodes.UNAUTHORIZED,
            body: { success: false, message: "Invalid crendential." },
        };
    }

    const comparePassword = await comparePasswords(password, logedUser.password);
    if (!comparePassword) {
        return {
            status: StatusCodes.UNAUTHORIZED,
            body: { success: false, message: "Wrong password." },
        };
    }

    if (!logedUser.isVerified) {
        return {
            status: StatusCodes.UNAUTHORIZED,
            body: { success: false, message: "Youre not verified, please verify." },
        };
    }

    let token = await generateJwtToken(logedUser._id, "Member");
    return {
        status: StatusCodes.ACCEPTED,
        body: {
            success: true,
            message: "Loging Successfull",
            token,
            userName: logedUser.name,
        },
    };
};

export const loginAdmin = async (email, password) => {
    const logedAdmin = await User.findOne({ email, role: "Admin" });
    if (!logedAdmin) {
        return {
            status: StatusCodes.UNAUTHORIZED,
            body: { success: false, message: "Invalid crendential." },
        };
    }

    const comparePassword = await comparePasswords(password, logedAdmin.password);
    if (!comparePassword) {
        return {
            status: StatusCodes.UNAUTHORIZED,
            body: { success: false, message: "Wrong password." },
        };
    }

    if (!logedAdmin.isVerified) {
        return {
            status: StatusCodes.UNAUTHORIZED,
            body: { success: false, message: "Youre not verified, please verify." },
        };
    }

    let token = await generateJwtToken(logedAdmin._id, "Admin");
    return {
        status: StatusCodes.ACCEPTED,
        body: {
            success: true,
            message: "Loging Successfull",
            token,
            userName: logedAdmin.name,
        },
    };
};

export const registerUser = async (userData) => {
    const { email, password } = userData;

    const isExisting = await User.findOne({ email });
    if (isExisting) {
        return {
            status: StatusCodes.BAD_REQUEST,
            body: { success: false, message: "Email already exists." },
        };
    }

    const hashedPassword = await convertSecurePassword(password);
    const userInput = { ...userData, password: hashedPassword };
    await User.create(userInput);

    return {
        status: StatusCodes.CREATED,
        body: { success: true, message: "Successfully registed your accound" },
    };
};
