import express from "express";

import {
  addRoom,
  getRooms,
  getRoomsByHotel,
  updateRoom,
  deleteRoom,
  getMyRooms,
  getRoomById,
} from "../controllers/roomController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();


// Get All Rooms
router.get("/", getRooms);


// Get Owner Rooms
router.get(
  "/my-rooms",
  authMiddleware,
  getMyRooms
);


// Get Single Room By ID
router.get(
  "/:id",
  getRoomById
);


// Get Rooms By Hotel
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