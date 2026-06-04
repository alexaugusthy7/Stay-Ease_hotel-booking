import {
  useEffect,
  useState,
} from "react";

import api from "../../services/api";

import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";

const HotelsList = () => {

  const [hotels, setHotels] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const { token } = useAuth();


  // Fetch Hotels
  const fetchHotels = async () => {

    try {

      const response =
        await api.get("/hotels");

      setHotels(
        response.data.hotels || []
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to fetch hotels"
      );

    } finally {

      setLoading(false);
    }
  };


  // Delete Hotel
  const deleteHotel = async (
    id
  ) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this hotel?"
      );

    if (!confirmDelete) return;

    try {

      await api.delete(
        `/hotels/delete/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Hotel deleted successfully"
      );

      fetchHotels();

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to delete hotel"
      );
    }
  };


  // Edit Hotel
  const editHotel = (
    hotel
  ) => {

    toast.success(
      `Edit feature for ${hotel.name} coming soon`
    );
  };


  useEffect(() => {

    fetchHotels();

  }, []);


  // Loading
  if (loading) {

    return (

      <div className="flex justify-center items-center h-64">

        <h1 className="text-2xl font-bold">
          Loading Hotels...
        </h1>

      </div>
    );
  }


  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-8">
        Hotels List
      </h1>


      {hotels.length === 0 ? (

        <div className="bg-white p-6 rounded-xl shadow">

          <p className="text-gray-500 text-lg">
            No hotels found
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {hotels.map((hotel) => (

            <div
              key={hotel._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border"
            >

              {/* Hotel Image */}
              <img
                src={
                  hotel.image
                    ? `http://localhost:5000/${hotel.image}`
                    : "https://via.placeholder.com/400x250"
                }
                alt={hotel.name}
                className="w-full h-52 object-cover"
              />


              {/* Content */}
              <div className="p-5">

                <h2 className="text-2xl font-bold">
                  {hotel.name}
                </h2>

                <p className="text-gray-500 mt-1">
                  {hotel.city}
                </p>

                <p className="mt-3 text-lg font-semibold">
                  ₹{hotel.pricePerNight} / night
                </p>


                {/* Buttons */}
                <div className="flex gap-3 mt-5">

                  <button
                    onClick={() =>
                      editHotel(hotel)
                    }
                    className="bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-2 rounded-lg w-full"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteHotel(
                        hotel._id
                      )
                    }
                    className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg w-full"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default HotelsList;