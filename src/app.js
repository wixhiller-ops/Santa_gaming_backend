import express from "express";
import cors from "cors";
import createError from "http-errors";
import errorHandler from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();

// app.use(cors({
//     origin: "https://santa-gaming.vercel.app"
// }));
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);

app.get("/", (req, res) => {
    res.send("Santa Gaming API Running");
});

// 404 HANDLER
app.use((req, res, next) => {
    return next(createError(404, "Not Found - " + req.originalUrl));
});

app.use(errorHandler);

export default app;
