import express from "express";

import {
  getAllUsers,
  deleteUser,
  toggleUserStatus
} from "../controllers/userController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router =
  express.Router();

router.get(
  "/all",
  authMiddleware,
  adminMiddleware,
  getAllUsers
);

router.delete(
  "/delete/:id",
  authMiddleware,
  adminMiddleware,
  deleteUser
);

router.put(
  "/toggle-status/:id",
  authMiddleware,
  adminMiddleware,
  toggleUserStatus
);


export default router;