import Otp from "../models/Otp.js";

// Send OTP
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Save OTP
    await Otp.create({
      email,
      otp,
    });

    // Send Email using Brevo API
    const response = await fetch(
      "https://api.brevo.com/v3/smtp/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },
        body: JSON.stringify({
          sender: {
            name: "StayEase",
            email: "alexaugustine583@gmail.com", // Verified sender
          },
          to: [
            {
              email: email,
            },
          ],
          subject: "StayEase Booking OTP",
          htmlContent: `
            <h2>Your OTP Code</h2>
            <h1>${otp}</h1>
            <p>This OTP is valid for 5 minutes.</p>
          `,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      throw new Error(data.message || "Failed to send email");
    }

    res.status(200).json({
      message: "OTP sent successfully",
    });

  } catch (error) {
    console.error("OTP ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const validOtp = await Otp.findOne({
      email,
      otp,
    });

    if (!validOtp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    res.status(200).json({
      message: "OTP verified successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};