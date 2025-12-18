import dotenv from "dotenv";
dotenv.config();

const config = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI,
    env: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,
    BACKEND_URL: process.env.BACKEND_URL,
};

export default config;
