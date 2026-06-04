import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import sendBookingEmail from "../utils/sendBookingEmail.js";


// ================= CREATE BOOKING =================
export const createBooking = async (
  req,
  res
) => {

  try {

    const {
      room,
      checkInDate,
      checkOutDate,
      guestName,
      email,
      phone,
      guests,
      specialRequests,
      paymentMethod,
    } = req.body;

    // Validate Required Fields
    if (
      !room ||
      !checkInDate ||
      !checkOutDate ||
      !guestName ||
      !email ||
      !phone ||
      !guests ||
      !paymentMethod
    ) {

      return res.status(400).json({
        message:
          "Please fill all required fields",
      });
    }

    // Find Room
    const roomData =
      await Room.findById(room);

    if (!roomData) {

      return res.status(404).json({
        message: "Room not found",
      });
    }

    // Validate Dates
    const checkIn =
      new Date(checkInDate);

    const checkOut =
      new Date(checkOutDate);

    const days =
      (checkOut - checkIn) /
      (1000 * 60 * 60 * 24);

    if (days <= 0) {

      return res.status(400).json({
        message:
          "Check-out date must be after check-in date",
      });
    }

    // Check overlapping bookings
    const existingBooking =
      await Booking.findOne({

        room,

        checkInDate: {
          $lt: checkOutDate,
        },

        checkOutDate: {
          $gt: checkInDate,
        },

        status: "confirmed",
      });

    if (existingBooking) {

      return res.status(400).json({
        message:
          "Room already booked for selected dates",
      });
    }

    // Calculate Total Price
    const totalPrice =
      days *
      roomData.pricePerNight;

    // Create Booking
    const booking =
      await Booking.create({

        user: req.user._id,

        room,

        checkInDate,

        checkOutDate,

        guestName,

        email,

        phone,

        guests,

        specialRequests,

        paymentMethod,

        totalPrice,

        paymentStatus:
          "Pending",

        status: "confirmed",
      });

    // Populate Room
    const populatedBooking =
      await Booking.findById(
        booking._id
      ).populate("room");

    // Send Email
    await sendBookingEmail(
      populatedBooking
    );

    res.status(201).json({

      message:
        "Booking successful",

      booking:
        populatedBooking,
    });

  } catch (error) {

    console.log(
      "Create Booking Error:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};


// ================= CANCEL BOOKING =================
export const cancelBooking =
  async (req, res) => {

    try {

      const booking =
        await Booking.findById(
          req.params.id
        );

      if (!booking) {

        return res.status(404).json({
          message:
            "Booking not found",
        });
      }

      // Already Cancelled
      if (
        booking.status ===
        "cancelled"
      ) {

        return res.status(400).json({
          message:
            "Booking already cancelled",
        });
      }

      // Update Booking
      await Booking.findByIdAndUpdate(
        req.params.id,
        {
          status: "cancelled",
        }
      );

      res.status(200).json({
        message:
          "Booking cancelled successfully",
      });

    } catch (error) {

      console.log(
        "Cancel Booking Error:",
        error
      );

      res.status(500).json({
        message: error.message,
      });
    }
  };

  // ================= GET MY BOOKINGS =================
export const getMyBookings =
  async (req, res) => {

    try {

      const bookings =
        await Booking.find({
          user: req.user._id,
        })

          .populate("room")

          .sort({
            createdAt: -1,
          });

      res.status(200).json(
        bookings
      );

    } catch (error) {

      console.log(
        "Get My Bookings Error:",
        error
      );

      res.status(500).json({
        message: error.message,
      });
    }
  };


// ================= GET ALL BOOKINGS =================
export const getAllBookings =
  async (req, res) => {

    try {

      const bookings =
        await Booking.find()

          .populate("room")

          .populate("user")

          .sort({
            createdAt: -1,
          });

      res.status(200).json(
        bookings
      );

    } catch (error) {

      console.log(
        "Get All Bookings Error:",
        error
      );

      res.status(500).json({
        message: error.message,
      });
    }
  };