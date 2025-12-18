import jwt from "jsonwebtoken";
import config from "../config/config.js";
import User from "../models/User.js";

// ================= AUTHENTICATE (USER OR ADMIN) =================
export const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        const error = new Error("Not authorized, no token");
        return next(error);
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);

        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            const error = new Error("User not found");
            throw error;
        }

        req.user = user; // user or admin
        next();
    } catch (err) {
        err.statusCode = 401;
        next(err);
    }
};

// ================= ADMIN ONLY =================
export const protectAdmin = async (req, res, next) => {
    protect(req, res, async (err) => {
        if (err) return next(err);

        if (req.user.role !== "admin") {
            const error = new Error("Admin access only");
            return next(error);
        }

        next();
    });
};
