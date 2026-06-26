import express from "express";

import {
  createRequest,
  getAllRequests,
  approveRequest,
} from "../controllers/ownerRequestController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// User submits request
router.post(
  "/request",
  authMiddleware,
  createRequest
);

// Admin views requests
router.get(
  "/all",
  authMiddleware,
  adminMiddleware,
  getAllRequests
);

// Admin approves request
router.put(
  "/approve/:id",
  authMiddleware,
  adminMiddleware,
  approveRequest
);

export default router;