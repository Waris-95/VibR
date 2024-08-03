import jwt from "jsonwebtoken";
import { Response } from "express";

const generateToken = (userId, res) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET environment variable is not set");
    }

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 100000, // 15 days in milliseconds
        httpOnly: true, // Prevent XSS cross-site scripting
		sameSite: "none", // CSRF attack cross-site request forgery
		secure: process.env.NODE_ENV !== "development", // HTTPS
    });

    return token;
};

export default generateToken;
