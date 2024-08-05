import jwt from "jsonwebtoken";
import prisma from "../prisma.js";
const protectRoute = async (req, res, next) => {
    try {
        console.log('Cookies received:', req.cookies); // Log all cookies
        const token = req.cookies.jwt;
        console.log('Token received:', token); // Log token
        if (!token) {
            console.error('No token provided');
            return res.status(401).json({ error: "Unauthorized - No token provided" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded); // Log decoded token
        if (!decoded) {
            console.error('Invalid token');
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, username: true, fullName: true, profilePic: true },
        });
        if (!user) {
            console.error('User not found');
            return res.status(404).json({ error: "User not found" });
        }
        req.user = user;
        console.log('User authenticated:', user); // Log authenticated user
        next();
    }
    catch (error) {
        console.error('Error in protectRoute middleware', error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export default protectRoute;
