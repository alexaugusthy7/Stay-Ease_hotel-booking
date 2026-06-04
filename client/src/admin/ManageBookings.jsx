import {
  useEffect,
  useState,
} from "react";

import api from "../services/api";

import toast from "react-hot-toast";

const ManageBookings = () => {

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  // Fetch All Bookings
  const fetchBookings = async () => {

  try {

    setLoading(true);

    const token =
      localStorage.getItem("token");

    const response =
      await api.get(
        "/bookings/all",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    console.log(
      response.data
    );

    setBookings(
      response.data || []
    );

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
  const cancelBooking = async (
    id
  ) => {

    try {

      await api.put(
        `/bookings/cancel/${id}`
      );

      toast.success(
        "Booking cancelled"
      );

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === id
            ? {
              ...booking,
              status: "cancelled",
            }
            : booking
        )
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to cancel booking"
      );
    }
  };


  useEffect(() => {
    fetchBookings();
  }, []);


  if (loading) {

    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold">
          Loading...
        </h1>
      </div>
    );
  }


  return (
    <div>

      {/* Heading */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Manage Bookings
        </h1>

        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold">
          Total Bookings:
          {" "}
          {bookings.length}
        </div>

      </div>


      {/* Empty State */}
      {bookings.length === 0 && (

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600">
            No bookings found
          </p>
        </div>

      )}


      {/* Booking Cards */}
      <div className="space-y-6">

        {bookings.map((booking) => (

          <div
            key={booking._id}
            className="bg-white rounded-2xl shadow border p-6"
          >

            {/* Top */}
            <div className="flex justify-between items-center mb-6">

              <div>

                <h2 className="text-2xl font-bold">
                  {
                    booking.room?.roomType ||
                    "Room"
                  }
                </h2>

                <p className="text-gray-500">
                  {
                    booking.hotel?.name ||
                    "Hotel"
                  }
                </p>

              </div>

              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold
                ${booking.status ===
                    "cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                  }`}
              >
                {booking.status || "Booked"}
              </span>

            </div>


            {/* Booking Details */}
            <div className="grid md:grid-cols-2 gap-6">

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


            {/* Bottom */}
            <div className="border-t mt-6 pt-5 flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Total Price
                </p>

                <p className="text-3xl font-bold">
                  ₹{booking.totalPrice}
                </p>

              </div>


              <button
                onClick={() =>
                  cancelBooking(
                    booking._id
                  )
                }
                disabled={
                  booking.status ===
                  "cancelled"
                }
                className={`px-5 py-3 rounded-xl text-white font-semibold transition
                ${booking.status ===
                    "cancelled"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                  }`}
              >
                {
                  booking.status ===
                    "cancelled"
                    ? "Cancelled"
                    : "Cancel Booking"
                }
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default ManageBookings;