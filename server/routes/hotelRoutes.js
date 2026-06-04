import express from "express";

import {
  addHotel,
  getHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
} from "../controllers/hotelController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();


// Public Route
router.get("/", getHotels);

router.get("/:id", getHotelById);
// Admin Route
router.post(
  "/add",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  addHotel
);

router.put(
  "/update/:id",
  authMiddleware,
  adminMiddleware,
  updateHotel
);

router.delete(
  "/delete/:id",
  authMiddleware,
  adminMiddleware,
  deleteHotel
);

export default router;