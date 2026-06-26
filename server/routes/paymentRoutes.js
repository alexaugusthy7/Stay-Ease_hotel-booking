import express from "express";

import {
  createPaymentOrder,
  verifyPayment,
} from "../controllers/paymentController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// Protected Route
router.post(
  "/create-order",
  authMiddleware,
  createPaymentOrder
);

// routes/paymentRoutes.js

router.post(
  "/verify-payment",
  verifyPayment
);

export default router;