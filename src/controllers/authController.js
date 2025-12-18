import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import createError from "http-errors";

// 🔐 Generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, config.jwtSecret, { expiresIn: "30m" });
};

//
// ================= USER REGISTER =================
//
export const userRegister = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return next(createError(400, "Username and password are required"));
    }

    const exists = await User.findOne({ username });
    if (exists) {
      return next(createError(400, "Username already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
    });

    res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        message: "User registered successfully",
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
        },
      },
    });
  } catch (err) {
    return next(createError(500, err.message || "Server error"));
  }
};

//
// ================= LOGIN (USER + ADMIN) =================
//
export const userLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return next(createError(400, "Username and password are required"));
    }

    const user = await User.findOne({ username });
    if (!user) {
      return next(createError(401, "Invalid username or password"));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(createError(401, "Invalid username or password"));
    }

    res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        message: "Login successful",
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
        },
        token: generateToken(user._id, user.role),
      },
    });
  } catch (err) {
    return next(createError(500, err.message || "Server error"));
  }
};

//
// ================= GET ALL USERS (ADMIN ONLY) =================
//
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 });

    res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        message: "Users fetched successfully",
        users,
      },
    });
  } catch (err) {
    return next(createError(500, err.message || "Server error"));
  }
};
