import { useEffect, useState, } from "react";

import MainLayout from "../layouts/MainLayout";

import api from "../services/api";

import { useAuth, } from "../context/AuthContext";

import toast from "react-hot-toast";

import jsPDF from "jspdf";

const Bookings = () => {

  const { token, user } = useAuth();

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // Fetch Bookings
  const fetchBookings = async () => {

    try {

      const endpoint =
        user?.role === "admin"
          ? "/bookings/all"
          : "/bookings/my-bookings";

      const response =
        await api.get(
          endpoint,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setBookings(response.data);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to fetch bookings"
      );

    } finally {

      setLoading(false);

    }
  };

  // Cancel Booking
  const cancelBooking = async (id) => {

    try {

      await api.put(
        `/bookings/cancel/${id}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Booking Cancelled"
      );

      // Remove instantly from UI
      setBookings((prev) =>
        prev.filter(
          (booking) =>
            booking._id !== id
        )
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to cancel booking"
      );
    }
  };
  const downloadReceipt = (booking) => {

    const doc = new jsPDF();

    // Title
    doc.setFillColor(30, 41, 59);
    doc.rect(0, 0, 210, 30, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("HOTEL BOOKING RECEIPT", 105, 18, {
      align: "center",
    });

    doc.setTextColor(0, 0, 0);

    let y = 45;

    doc.setFontSize(12);

    doc.text(`Booking ID : ${booking._id}`, 20, y);

    y += 10;

    doc.text(
      `Booking Date : ${new Date(
        booking.createdAt
      ).toLocaleDateString()}`,
      20,
      y
    );

    y += 20;

    doc.setFontSize(16);
    doc.text("Guest Details", 20, y);

    y += 10;

    doc.setFontSize(12);

    doc.text(`Name : ${booking.guestName}`, 20, y);

    y += 8;

    doc.text(`Email : ${booking.email}`, 20, y);

    y += 8;

    doc.text(`Phone : ${booking.phone}`, 20, y);

    y += 8;

    doc.text(`Guests : ${booking.guests}`, 20, y);

    y += 18;

    doc.setFontSize(16);

    doc.text("Hotel Details", 20, y);

    y += 10;

    doc.setFontSize(12);

    doc.text(`Hotel : ${booking.room.hotel.name}`, 20, y);

    y += 8;

    doc.text(`Room : ${booking.room.roomType}`, 20, y);

    y += 8;

    doc.text(`City : ${booking.room.hotel.city}`, 20, y);

    y += 18;

    doc.setFontSize(16);

    doc.text("Stay Details", 20, y);

    y += 10;

    doc.setFontSize(12);

    doc.text(
      `Check In : ${new Date(
        booking.checkInDate
      ).toLocaleDateString()}`,
      20,
      y
    );

    y += 8;

    doc.text(
      `Check Out : ${new Date(
        booking.checkOutDate
      ).toLocaleDateString()}`,
      20,
      y
    );

    y += 8;

    doc.text(
      `Payment : ${booking.paymentMethod}`,
      20,
      y
    );

    y += 8;

    doc.text(
      `Status : ${booking.paymentStatus}`,
      20,
      y
    );

    y += 20;

    doc.setDrawColor(150);

    doc.line(20, y, 190, y);

    y += 12;

    doc.setFontSize(18);

    doc.text(
      `TOTAL : ₹${booking.totalPrice}`,
      20,
      y
    );

    y += 30;

    doc.setFontSize(12);

    doc.setTextColor(100);

    doc.text(
      "Thank you for choosing our Hotel Booking System.",
      105,
      y,
      { align: "center" }
    );

    y += 8;

    doc.text(
      "We wish you a pleasant stay!",
      105,
      y,
      { align: "center" }
    );

    doc.save(
      `Booking-${booking._id}.pdf`
    );

  };

  useEffect(() => {

    if (token && user) {
      fetchBookings();
    }

  }, [token, user]);

  // Loading
  if (loading) {

    return (
      <MainLayout>
        <div className="text-center mt-10">
          <h1 className="text-2xl font-bold">
            Loading...
          </h1>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>

      <div className="max-w-5xl mx-auto py-10 px-4">

        {/* Heading */}
        <h1 className="text-4xl font-bold mb-8">
          {
            user?.role === "admin"
              ? "All Bookings"
              : "My Bookings"
          }
        </h1>

        {/* No Bookings */}
        {bookings.length === 0 && (

          <div className="bg-white p-6 rounded-lg shadow">

            <p className="text-lg text-gray-600">
              No bookings found
            </p>

          </div>

        )}

        {/* Booking Cards */}
        <div className="space-y-6">

          {bookings
            ?.filter(
              (booking) =>
                booking.status !== "cancelled"
            )
            .map((booking) => (

              <div
                key={booking._id}
                className="bg-white shadow-lg rounded-2xl p-6 border"
              >

                {/* Top */}

                <div className="flex justify-between items-center mb-6">

                  <h2 className="text-3xl font-bold">
                    {booking.room?.roomType || "Room"}
                  </h2>

                  <p className="text-3xl font-bold mt-2">
                    Hotel: {booking.room?.hotel?.name}
                  </p>

                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold
                    ${booking.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {booking.paymentStatus}
                  </span>

                </div>

                {/* Guest Info */}
                <div className="grid md:grid-cols-2 gap-5 mb-6">

                  <div>
                    <p className="text-gray-500">
                      Guest Name
                    </p>

                    <p className="font-semibold text-lg">
                      {booking.guestName}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">
                      Email
                    </p>

                    <p className="font-semibold text-lg">
                      {booking.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">
                      Phone
                    </p>

                    <p className="font-semibold text-lg">
                      {booking.phone}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">
                      Guests
                    </p>

                    <p className="font-semibold text-lg">
                      {booking.guests}
                    </p>
                  </div>

                </div>

                {/* Dates */}
                <div className="grid md:grid-cols-2 gap-5 mb-6">

                  <div>
                    <p className="text-gray-500">
                      Check-In
                    </p>

                    <p className="font-semibold text-lg">
                      {new Date(
                        booking.checkInDate
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">
                      Check-Out
                    </p>

                    <p className="font-semibold text-lg">
                      {new Date(
                        booking.checkOutDate
                      ).toLocaleDateString()}
                    </p>
                  </div>

                </div>

                {/* Payment Method */}
                <div>
                  <p className="text-gray-500 text-sm">
                    Payment Method
                  </p>

                  <p className="font-bold text-lg">
                    {booking.paymentMethod === "online"
                      ? "Pay Now"
                      : "Pay At Hotel"}
                  </p>

                  <span
                    className={`text-sm font-medium ${booking.paymentMethod === "online"
                      ? "text-green-600"
                      : "text-orange-500"
                      }`}
                  >
                    {booking.paymentMethod === "online"
                      ? "(Online)"
                      : "(Offline)"}
                  </span>
                </div>

                {/* Special Requests */}
                {booking.specialRequests && (

                  <div className="mb-6">

                    <p className="text-gray-500">
                      Special Requests
                    </p>

                    <p className="font-semibold">
                      {booking.specialRequests}
                    </p>

                  </div>

                )}

                {/* Bottom */}
                <div className="border-t pt-5 flex flex-col md:flex-row justify-between items-center gap-4">

                  <div>

                    <p className="text-gray-500">
                      Total Price
                    </p>

                    <p className="text-3xl font-bold">
                      ₹{booking.totalPrice}
                    </p>

                  </div>

                  {/* Cancel Button */}
                  <div className="flex gap-3">

                    <button
                      onClick={() => downloadReceipt(booking)}
                      className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                    >
                      Download Receipt
                    </button>

                    <button
                      onClick={() => cancelBooking(booking._id)}
                      className="px-5 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold"
                    >
                      Cancel Booking
                    </button>

                  </div>

                </div>

              </div>

            ))}

        </div>

      </div>

    </MainLayout>
  );
};

export default Bookings;