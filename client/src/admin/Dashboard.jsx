import {
  useEffect,
  useState,
} from "react";

import api from "../services/api";

import toast from "react-hot-toast";

const Dashboard = () => {

  const [stats, setStats] =
    useState({
      totalHotels: 0,
      totalRooms: 0,
      totalBookings: 0,
      totalRevenue: 0,
    });

  const [
    recentBookings,
    setRecentBookings,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);


  const fetchDashboardData =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        // Headers
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Fetch Hotels
        const hotelsRes =
          await api.get(
            "/hotels"
          );

        // Fetch Rooms
        const roomsRes =
          await api.get(
            "/rooms"
          );

        // Fetch Bookings
        const bookingsRes =
          await api.get(
            "/bookings/all",
            config
          );

        const bookings =
          bookingsRes.data || [];

        // Calculate Revenue
        const revenue =
          bookings.reduce(
            (
              total,
              booking
            ) =>
              total +
              (
                booking.totalPrice ||
                0
              ),
            0
          );

        setStats({
          totalHotels:
            hotelsRes.data.hotels
              ?.length || 0,

          totalRooms:
            roomsRes.data
              ?.length || 0,

          totalBookings:
            bookings.length,

          totalRevenue:
            revenue,
        });

        // Latest bookings
        setRecentBookings(
          bookings.slice(0, 5)
        );

      } catch (error) {

        console.log(error);

        if (
          error.response?.status ===
          401
        ) {

          toast.error(
            "Unauthorized. Please login again."
          );

        } else {

          toast.error(
            "Failed to load dashboard"
          );
        }

      } finally {

        setLoading(false);
      }
    };


  useEffect(() => {

    fetchDashboardData();

  }, []);


  if (loading) {

    return (
      <div className="p-6">

        <h1 className="text-2xl font-bold">
          Loading Dashboard...
        </h1>

      </div>
    );
  }


  return (

    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Heading */}
      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>


      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        {/* Hotels */}
        <div className="bg-white shadow-lg rounded-xl p-6">

          <h2 className="text-gray-500 text-lg">
            Total Hotels
          </h2>

          <p className="text-4xl font-bold mt-2 text-blue-600">
            {stats.totalHotels}
          </p>

        </div>


        {/* Rooms */}
        <div className="bg-white shadow-lg rounded-xl p-6">

          <h2 className="text-gray-500 text-lg">
            Total Rooms
          </h2>

          <p className="text-4xl font-bold mt-2 text-green-600">
            {stats.totalRooms}
          </p>

        </div>


        {/* Bookings */}
        <div className="bg-white shadow-lg rounded-xl p-6">

          <h2 className="text-gray-500 text-lg">
            Total Bookings
          </h2>

          <p className="text-4xl font-bold mt-2 text-purple-600">
            {stats.totalBookings}
          </p>

        </div>


        {/* Revenue */}
        <div className="bg-white shadow-lg rounded-xl p-6">

          <h2 className="text-gray-500 text-lg">
            Total Revenue
          </h2>

          <p className="text-4xl font-bold mt-2 text-red-500">
            ₹{stats.totalRevenue}
          </p>

        </div>

      </div>


      {/* Recent Bookings */}
      <div className="bg-white shadow-lg rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Recent Bookings
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b text-left">

                <th className="py-3">
                  Guest
                </th>

                <th className="py-3">
                  Room
                </th>

                <th className="py-3">
                  Amount
                </th>

                <th className="py-3">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {recentBookings.length >
              0 ? (

                recentBookings.map(
                  (booking) => (

                    <tr
                      key={
                        booking._id
                      }
                      className="border-b"
                    >

                      <td className="py-4">
                        {
                          booking.guestName
                        }
                      </td>

                      <td className="py-4">
                        {booking.room
                          ?.roomType ||
                          "N/A"}
                      </td>

                      <td className="py-4">
                        ₹
                        {
                          booking.totalPrice
                        }
                      </td>

                      <td className="py-4">

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium
                          ${
                            booking.paymentStatus ===
                            "Paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {
                            booking.paymentStatus
                          }
                        </span>

                      </td>

                    </tr>
                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="4"
                    className="py-6 text-center text-gray-500"
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

export default Dashboard;