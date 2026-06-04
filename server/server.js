import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";    

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads",express.static("uploads"));

app.use("/api/auth",authRoutes);

app.use("/api/hotels",hotelRoutes);

app.use("/api/rooms",roomRoutes);

app.use("/api/bookings",bookingRoutes);

app.use("/api/payments",paymentRoutes);

app.use("/api/otp",otpRoutes);

app.use("/api/admin",adminRoutes);

app.use("/api/reviews",reviewRoutes);

app.get("/", (req, res) => {res.send("API is running...");
  
});

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );
});