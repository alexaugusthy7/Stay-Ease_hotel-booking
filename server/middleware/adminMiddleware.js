import User from "../models/User.js";

const adminMiddleware = async (req, res, next) => {
  try {
    // Find logged-in user
    const user = await User.findById(req.user.id);

    // Check role
    if (
      user.role !== "admin" &&
      user.role !== "hotelOwner"
    ) {
      return res.status(403).json({
        message: "Access denied. Admin only.",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export default adminMiddleware;