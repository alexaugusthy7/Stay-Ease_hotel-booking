import express from "express";

import {
  createBooking,
  getMyBookings,
  cancelBooking,
  getAllBookings,
} from "../controllers/bookingController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();


// Protected Routes
router.post(
  "/",
  authMiddleware,
  createBooking
);

router.get(
  "/my-bookings",
  authMiddleware,
  getMyBookings
);

router.put(
  "/cancel/:id",
  authMiddleware,
  cancelBooking
);

router.get(
  "/all",
  authMiddleware,
  adminMiddleware,
  getAllBookings
);

export default router;