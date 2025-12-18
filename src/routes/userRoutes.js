import express from "express";
import { userRegister, userLogin, getAllUsers } from "../controllers/authController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/users/register
router.post("/register", userRegister);

// POST /api/users/login
router.post("/login", userLogin);

// GET /api/users
router.get("/getAllUsers", protectAdmin, getAllUsers);

export default router;
