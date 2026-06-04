import razorpay from "../config/razorpay.js";

import crypto from "crypto";

import Booking from "../models/Booking.js";


// Create Payment Order
export const createPaymentOrder =
  async (req, res) => {

  try {

    const { amount } = req.body;

    const options = {

      amount: amount * 100,

      currency: "INR",

      receipt:
        "receipt_" + Date.now(),

    };


    const order =
      await razorpay.orders.create(
        options
      );


    res.status(200).json(order);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};




// Verify Payment
export const verifyPayment =
  async (req, res) => {

  try {

    const {

      razorpay_order_id,

      razorpay_payment_id,

      razorpay_signature,

      bookingId,

    } = req.body;


    // Generate Signature
    const body =
      razorpay_order_id +
      "|" +
      razorpay_payment_id;


    const expectedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env
            .RAZORPAY_KEY_SECRET
        )

        .update(body.toString())

        .digest("hex");


    // Verify Signature
    if (
      expectedSignature ===
      razorpay_signature
    ) {

      // Update Booking Payment Status
      await Booking.findByIdAndUpdate(
        bookingId,
        {
          paymentStatus: "Paid",
        }
      );


      return res.status(200).json({

        success: true,

        message:
          "Payment verified successfully",

      });

    } else {

      return res.status(400).json({

        success: false,

        message:
          "Invalid signature",

      });
    }

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};