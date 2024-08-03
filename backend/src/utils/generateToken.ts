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
    // Check if the JWT_SECRET is available before attempting to generate a token.
    if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET environment variable is not set");
        throw new Error("JWT_SECRET environment variable is not set");
    }

    try {
        // Generate the JWT.
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "15d",  // Token expires in 15 days.
        });

        // Attach the token to an HTTP cookie with proper security settings.
        res.cookie("jwt", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000, // Cookie expires in 15 days, converted to milliseconds.
            httpOnly: true,  // Protect against XSS attacks by not allowing client-side JavaScript access.
            sameSite: "none", // Specify None for cross-site cookie use.
            secure: process.env.NODE_ENV !== "development", // Only use secure cookies in production (requires HTTPS).
        });

        console.log('Token set in cookie:', token); // Log for debugging

        return token;
    } catch (error:any) {
        console.error('Error in generateToken:', error.message);
        throw error; // Rethrow the error after logging it for further handling by the caller.
    }
};

export default generateToken;
