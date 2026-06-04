import Otp from "../models/Otp.js";
import transporter from "../config/mail.js";


// Send OTP
export const sendOtp = async (
  req,
  res
) => {

  try {

    const { email } = req.body;

    const otp =
      Math.floor(
        100000 + Math.random() * 900000
      ).toString();

    // Save OTP
    await Otp.create({
      email,
      otp,
    });

    // Send Email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      to: email,

      subject:
        "StayEase Booking OTP",

      html: `
        <h2>Your OTP Code</h2>
        <h1>${otp}</h1>
        <p>Valid for 5 minutes</p>
      `,
    });

    res.status(200).json({
      message: "OTP sent successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// Verify OTP
export const verifyOtp = async (
  req,
  res
) => {

  try {

    const { email, otp } = req.body;

    const validOtp =
      await Otp.findOne({
        email,
        otp,
      });

    if (!validOtp) {

      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    res.status(200).json({
      message:
        "OTP verified successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};