import {
  useEffect,
  useState,
} from "react";

import api from "../services/api";

import toast from "react-hot-toast";

import { BASE_URL } from "../services/api";

const ManageHotels = () => {

  const [hotels, setHotels] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [formData, setFormData] =
    useState({
      name: "",
      city: "",
      address: "",
      description: "",
      pricePerNight: "",
    });

  const [image, setImage] =
    useState(null);

  // FETCH HOTELS
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

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // ADD HOTEL
  const addHotel = async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem("token");

      const hotelData =
        new FormData();

      hotelData.append(
        "name",
        formData.name
      );

      hotelData.append(
        "city",
        formData.city
      );

      hotelData.append(
        "address",
        formData.address
      );

      hotelData.append(
        "description",
        formData.description
      );

      hotelData.append(
        "pricePerNight",
        formData.pricePerNight
      );

      hotelData.append(
        "image",
        image
      );

      const response =
        await api.post(
          "/hotels/add",
          hotelData,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      toast.success(
        "Hotel added successfully"
      );

      // RESET FORM
      setFormData({
        name: "",
        city: "",
        address: "",
        description: "",
        pricePerNight: "",
      });

      setImage(null);

      // UPDATE UI
      setHotels((prev) => [
        response.data.hotel,
        ...prev,
      ]);

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to add hotel"
      );
    }
  };

  // DELETE HOTEL
  const deleteHotel = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this hotel?"
      );

    if (!confirmDelete) return;

    try {

      const token =
        localStorage.getItem("token");

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

      // UPDATE UI
      setHotels((prev) =>
        prev.filter(
          (hotel) =>
            hotel._id !== id
        )
      );

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to delete hotel"
      );
    }
  };

  useEffect(() => {

    fetchHotels();

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

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Manage Hotels
        </h1>

        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold">

          Total Hotels:
          {" "}
          {hotels.length}

        </div>

      </div>

      {/* ADD HOTEL FORM */}
      <form
        onSubmit={addHotel}
        className="bg-white shadow rounded-2xl p-6 mb-10"
      >

        <h2 className="text-2xl font-bold mb-6">
          Add Hotel
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <input
            type="text"
            name="name"
            placeholder="Hotel Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="number"
            name="pricePerNight"
            placeholder="Price Per Night"
            value={
              formData.pricePerNight
            }
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

        </div>

        <textarea
          name="description"
          placeholder="Description"
          value={
            formData.description
          }
          onChange={handleChange}
          className="border p-3 rounded-lg w-full mt-5"
          rows="4"
          required
        />

        <input
          type="file"
          onChange={(e) =>
            setImage(
              e.target.files[0]
            )
          }
          className="mt-5"
          required
        />

        <button
          type="submit"
          className="mt-6 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
        >

          Add Hotel

        </button>

      </form>

      {/* HOTELS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {hotels.map((hotel) => (

          <div
            key={hotel._id}
            className="bg-white rounded-2xl shadow-lg border overflow-hidden hover:scale-105 transition duration-300"
          >

            <img
              src={
                hotel.image?.startsWith("http")
                  ? hotel.image
                  : `${BASE_URL}/${hotel.image}`
              }
              alt={hotel.name}
              className="w-full h-56 object-cover"
            />

            <div className="p-5">

              <h2 className="text-2xl font-bold">
                {hotel.name}
              </h2>

              <p className="text-gray-500 mt-1">
                {hotel.city}
              </p>

              <p className="mt-3 text-gray-600 line-clamp-3">
                {hotel.description}
              </p>

              <p className="mt-4 text-xl font-bold">

                ₹
                {hotel.pricePerNight}
                {" "}
                / night

              </p>

              <button
                onClick={() =>
                  deleteHotel(
                    hotel._id
                  )
                }
                className="mt-5 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
              >

                Delete Hotel

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default ManageHotels;