import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { app, server } from "./socket/socket.js";
import protectRoute from "./db/middleware/protectRoute.js";
import cors from "cors";
dotenv.config();
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();
// Middleware
app.use(cookieParser()); // for parsing cookies
app.use(express.json()); // for parsing application/json
// API Routes
app.use("/api/auth/me", protectRoute);
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
// Serve frontend files
if (process.env.NODE_ENV !== "development") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
    });
}
// Start the server
server.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
