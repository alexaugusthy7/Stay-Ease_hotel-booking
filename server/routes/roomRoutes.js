import express from "express";

import {
  addRoom,
  getRooms,
  getRoomsByHotel,
  updateRoom,
  deleteRoom,
} from "../controllers/roomController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();


router.get("/", getRooms);

// Get rooms by hotel
router.get(
  "/hotel/:hotelId",
  getRoomsByHotel
);


// Add Room
router.post(
  "/add",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  addRoom
);

// Update Room
router.put(
  "/update/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  updateRoom
);

// Delete Room
router.delete(
  "/delete/:id",
  authMiddleware,
  adminMiddleware,
  deleteRoom
);

export default router;