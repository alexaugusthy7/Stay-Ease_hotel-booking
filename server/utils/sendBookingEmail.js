const sendBookingEmail = async (booking) => {
  try {
    console.log("Sending booking email to:", booking.email);

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
            email: "alexaugustine583@gmail.com", // Your verified sender
          },
          to: [
            {
              email: booking.email,
            },
          ],
          subject: "Booking Confirmation - StayEase",
          htmlContent: `
            <h2>🎉 Booking Confirmed</h2>

            <p>Hello <strong>${booking.guestName}</strong>,</p>

            <p>Your booking has been confirmed successfully.</p>

            <h3>Booking Details</h3>

            <ul>
              <li><strong>Check-In:</strong> ${new Date(
                booking.checkInDate
              ).toLocaleDateString()}</li>

              <li><strong>Check-Out:</strong> ${new Date(
                booking.checkOutDate
              ).toLocaleDateString()}</li>

              <li><strong>Guests:</strong> ${booking.guests}</li>

              <li><strong>Total Price:</strong> ₹${booking.totalPrice}</li>

              <li><strong>Payment Method:</strong> ${booking.paymentMethod}</li>
            </ul>

            <p>Thank you for choosing <strong>StayEase</strong>. We wish you a pleasant stay! 🏨</p>
          `,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Brevo Error:", data);
      throw new Error(data.message || "Failed to send booking email");
    }

    console.log("Booking confirmation email sent successfully.");
  } catch (error) {
    console.error("Booking Email Error:", error);
  }
};

export default sendBookingEmail;