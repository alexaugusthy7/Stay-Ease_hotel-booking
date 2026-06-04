import express from "express";
import { registerUser,loginUser } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Protected profile accessed",
    user: req.user,
  });
});
router.get(
  "/admin",
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    res.status(200).json({
      message: "Welcome Admin",
    });
  }
);

export default router;