import jwt from "jsonwebtoken";
import { Response } from "express";

/**
 * Generates a JWT for a given user and attaches it to an HTTP cookie.
 * 
 * @param {string} userId - The user ID to encode in the JWT.
 * @param {Response} res - The Express response object to which the cookie will be attached.
 * @returns {string} The generated JWT.
 */
const generateToken = (userId: string, res: Response) => {
    if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET environment variable is not set");
        throw new Error("JWT_SECRET environment variable is not set");
    }

    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "15d",
        });

        const isProduction = process.env.NODE_ENV === "production";
        res.cookie("jwt", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
            httpOnly: true,
            sameSite: isProduction ? "none" : "lax",
            secure: isProduction,
        });

        console.log('Token set in cookie:', token);

        return token;
    } catch (error: any) {
        console.error('Error in generateToken:', error.message);
        throw error;
    }
};

export default generateToken;
