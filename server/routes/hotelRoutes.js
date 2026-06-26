import express from "express";

import {
  addHotel,
  getHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
  getMyHotels,
} from "../controllers/hotelController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import ownerMiddleware from "../middleware/ownerMiddleware.js";

const router = express.Router();


// Public Route
router.get("/", getHotels);

router.get(
  "/my-hotels",
  authMiddleware,
  getMyHotels
);

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
  ownerMiddleware,
  updateHotel
);

router.delete(
  "/delete/:id",
  authMiddleware,
  adminMiddleware,
  deleteHotel
);



export default router;