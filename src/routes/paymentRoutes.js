import express from "express";
import {
    upsertPaymentOption,
    getActivePaymentOptions,
    deletePaymentOption,
    getAllPaymentOptions,
} from "../controllers/paymentController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/admin/payment", protectAdmin, upsertPaymentOption);
router.delete("/admin/payment/:id", protectAdmin, deletePaymentOption);

router.get("/getAllPaymentOptions", protectAdmin, getAllPaymentOptions);
router.get("/getActivePayments", getActivePaymentOptions);

export default router;
