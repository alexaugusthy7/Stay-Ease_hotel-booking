import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  family: 4,          // <-- Force IPv4
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Error:", error);
  } else {
    console.log("SMTP Server is ready");
  }
});

export default transporter;