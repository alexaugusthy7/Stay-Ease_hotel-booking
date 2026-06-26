import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MyHotels = () => {

  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    fetchHotels();

  }, []);

  const fetchHotels = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await api.get(
          "/hotels/my-hotels",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );
      setHotels(
        Array.isArray(response.data)
          ? response.data
          : []
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to load hotels"
      );

    }

  };
  const deleteHotel = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      await api.delete(
        `/hotels/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Hotel deleted");

      setHotels(
        hotels.filter(
          hotel => hotel._id !== id
        )
      );

    } catch (error) {

      console.log(error);

      toast.error("Delete failed");

    }

  };

  return (

    <div className="p-8">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          My Hotels
        </h1>

        <button
          onClick={() =>
            navigate("/admin/Add-Hotel")
          }
          className="bg-black text-white px-5 py-2 rounded-lg"
        >
          + Add Hotel
        </button>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {Array.isArray(hotels) &&
          hotels.map((hotel) => (

            <div
              key={hotel._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden"
            >

              {hotel.image && (
                <img
                  src={
                    hotel.image.startsWith("http")
                      ? hotel.image
                      : `http://localhost:5000/${hotel.image}`
                  }
                  alt={hotel.name}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-4">

                <h2 className="text-xl font-bold">

                  {hotel.name}

                </h2>

                <p className="text-gray-500">

                  {hotel.city}

                </p>

                <p className="font-semibold mt-2">

                  ₹{hotel.pricePerNight}

                </p>
                <div className="mt-4 flex gap-2">

                  <button
                    onClick={() =>
                      navigate(
                        `/owner/edit-hotel/${hotel._id}`
                      )
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteHotel(hotel._id)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() =>
                      navigate(
                        `/admin/Add-Room/${hotel._id}`
                      )
                    }
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Add Room
                  </button>

                </div>

              </div>

            </div>

          ))}

      </div>

    </div>

  );

};

export default MyHotels;