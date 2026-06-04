import nodemailer from "nodemailer";

const sendBookingEmail = async (booking) => {

  try {

    console.log(
      "Sending booking email to:",
      booking.email
    );

    const transporter =
      nodemailer.createTransport({

        host: "smtp.gmail.com",

        port: 465,

        secure: true,

        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },

      });

    await transporter.verify();

    console.log(
      "SMTP Server Connected"
    );

    await transporter.sendMail({

      from: `"StayEase" <${process.env.EMAIL_USER}>`,

      to: booking.email,

      subject:
        "Booking Confirmation - StayEase",

      html: `
        <h2>Booking Confirmed</h2>

        <p>Hello ${booking.guestName},</p>

        <p>Your booking has been confirmed successfully.</p>

        <h3>Booking Details</h3>

        <ul>
          <li>
            Check-In:
            ${new Date(
              booking.checkInDate
            ).toLocaleDateString()}
          </li>

          <li>
            Check-Out:
            ${new Date(
              booking.checkOutDate
            ).toLocaleDateString()}
          </li>

          <li>
            Guests:
            ${booking.guests}
          </li>

          <li>
            Total Price:
            ₹${booking.totalPrice}
          </li>

          <li>
            Payment Method:
            ${booking.paymentMethod}
          </li>
        </ul>

        <p>
          Thank you for choosing StayEase.
        </p>
      `,
    });

    console.log(
      "Booking email sent successfully"
    );

  } catch (error) {

    console.log(
      "Booking Email Error:",
      error
    );
  }
};

export default sendBookingEmail;