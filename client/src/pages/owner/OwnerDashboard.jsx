import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

const OwnerDashboard = () => {
  // const [totalRevenue, setTotalRevenue] = useState(0);
  const [stats, setStats] = useState({
    totalHotels: 0,
    totalRooms: 0,
    totalBookings: 0,
    totalRevenue: 0,
  });

  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    const fetchOwnerStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get(
          "/bookings/owner-stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(response.data);

        const bookingsRes = await api.get(
          "/bookings/owner",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRecentBookings(bookingsRes.data.slice(0, 5));

      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch owner stats");
      }
    };

    fetchOwnerStats();
  }, []);

  return (

    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-black text-white p-6">

        <h1 className="text-3xl font-bold">
          Hotel Owner Dashboard
        </h1>

        <p className="text-gray-300 mt-2">
          Manage your hotels, rooms and bookings
        </p>

      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-4 gap-6 p-8">

        <Link
          to="/owner/hotels"
          className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-xl"
        >
          <h2 className="text-2xl font-bold">
            🏨 My Hotels
          </h2>

          <p className="mt-2 text-gray-500">
            View and manage hotels
          </p>

        </Link>

        <Link
          to="/owner/rooms"
          className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-xl"
        >
          <h2 className="text-2xl font-bold">
            🛏 My Rooms
          </h2>

          <p className="mt-2 text-gray-500">
            Manage hotel rooms
          </p>

        </Link>

        <Link
          to="/owner/bookings"
          className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-xl"
        >
          <h2 className="text-2xl font-bold">
            📖 Bookings
          </h2>

          <p className="mt-2 text-gray-500">
            View customer bookings
          </p>

        </Link>
        <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-xl">
          <h2 className="text-2xl font-bold text-green-600">
            ₹{stats.totalRevenue}
          </h2>

          <p className="mt-2 text-gray-500">
            Total Revenue
          </p>
        </div>


      </div>
      <div className="bg-white shadow-lg rounded-xl p-6 mt-8">

        <h2 className="text-2xl font-bold mb-6">
          Recent Bookings
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="py-3 text-left">Guest</th>

                <th className="py-3 text-left">Hotel</th>

                <th className="py-3 text-left">Room</th>

                <th className="py-3 text-left">Check In</th>

                <th className="py-3 text-left">Check Out</th>

                <th className="py-3 text-left">Amount</th>

                <th className="py-3 text-left">Payment</th>

              </tr>

            </thead>

            <tbody>
              {recentBookings.length > 0 ? (
                recentBookings.map((booking) => (
                  <tr key={booking._id} className="border-b">
                    <td className="py-4">{booking.guestName}</td>

                    <td className="py-4">
                      {booking.room?.hotel?.name || "N/A"}
                    </td>

                    <td className="py-4">
                      {booking.room?.roomType || "N/A"}
                    </td>

                    <td className="py-4">
                      {new Date(booking.checkInDate).toLocaleDateString()}
                    </td>

                    <td className="py-4">
                      {new Date(booking.checkOutDate).toLocaleDateString()}
                    </td>

                    <td className="py-4">
                      ₹{booking.totalPrice}
                    </td>

                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${booking.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {booking.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-8 text-gray-500"
                  >
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
};

export default OwnerDashboard;