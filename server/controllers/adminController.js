import Hotel from "../models/Hotel.js";
import Booking from "../models/Booking.js";

export const getDashboardStats =
  async (req, res) => {

    try {

      const totalHotels =
        await Hotel.countDocuments();

      const totalBookings =
        await Booking.countDocuments();

      const paidBookings =
        await Booking.find({
          paymentStatus: "Paid",
        });

      const totalRevenue =
        paidBookings.reduce(
          (acc, booking) =>
            acc + booking.totalPrice,
          0
        );

      const recentBookings =
        await Booking.find()
          .sort({ createdAt: -1 })
          .limit(5);

      res.json({
        totalHotels,
        totalBookings,
        totalRevenue,
        recentBookings,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
};