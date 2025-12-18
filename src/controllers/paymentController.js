import PaymentOption from "../models/PaymentOption.js";
import createError from "http-errors";

//
// ================= ADD / UPDATE PAYMENT (ADMIN) =================
//
export const upsertPaymentOption = async (req, res, next) => {
    try {
        const { name, link, image = "", isActive } = req.body;

        if (!name || !link) {
            return next(createError(400, "Payment name and link are required"));
        }

        const payment = await PaymentOption.findOneAndUpdate(
            { name },
            { link, image, isActive },
            { new: true, upsert: true }
        );

        res.status(200).json({
            StatusCode: 200,
            IsSuccess: true,
            ErrorMessage: [],
            Result: {
                message: "Payment option saved successfully",
                payment,
            },
        });
    } catch (err) {
        return next(createError(500, err.message || "Server error"));
    }
};

//
// ================= GET ACTIVE PAYMENTS =================
//
export const getActivePaymentOptions = async (req, res, next) => {
    try {
        const payments = await PaymentOption.find({ isActive: true });

        if (!payments || payments.length === 0) {
            return res.status(200).json({
                StatusCode: 200,
                IsSuccess: true,
                ErrorMessage: [],
                Result: {
                    message: "No active payment options found",
                    payments: [],
                },
            });
        }
        res.status(200).json({
            StatusCode: 200,
            IsSuccess: true,
            ErrorMessage: [],
            Result: {
                message: "All Active Payments are displayed successfully",
                payments,
            },
        });
    } catch (err) {
        return next(createError(500, err.message || "Server error"));
    }
};


//
// ================= GET ALL PAYMENTS =================
//
export const getAllPaymentOptions = async (req, res, next) => {
    try {
        const payments = await PaymentOption.find();

        if (!payments || payments.length === 0) {
            return res.status(200).json({
                StatusCode: 200,
                IsSuccess: true,
                ErrorMessage: [],
                Result: {
                    message: "No payment options found",
                    payments: [],
                },
            });
        }
        res.status(200).json({
            StatusCode: 200,
            IsSuccess: true,
            ErrorMessage: [],
            Result: {
                message: "All Payment Options are displayed successfully",
                payments,
            },
        });
    } catch (err) {
        return next(createError(500, err.message || "Server error"));
    }
};


//
// ================= DELETE PAYMENT (ADMIN) =================
//
export const deletePaymentOption = async (req, res, next) => {
    try {
        const { id } = req.params;

        const payment = await PaymentOption.findById(id);
        if (!payment) {
            return next(createError(404, "Payment option not found"));
        }

        await payment.deleteOne();

        res.status(200).json({
            StatusCode: 200,
            IsSuccess: true,
            ErrorMessage: [],
            Result: {
                message: "Payment option deleted successfully",
            },
        });
    } catch (err) {
        return next(createError(500, err.message || "Server error"));
    }
};
