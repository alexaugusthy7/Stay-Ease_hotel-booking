import express from "express";

import {
  createBooking,
  getMyBookings,
  cancelBooking,
  getAllBookings,
  getOwnerBookings,
  getOwnerStats,
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

router.get(
  "/owner",
  authMiddleware,
  getOwnerBookings
);

router.get(
  "/owner-stats",
  authMiddleware,
  getOwnerStats
);
export default router;