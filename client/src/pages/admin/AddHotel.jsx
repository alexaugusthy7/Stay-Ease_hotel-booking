import React, { useState } from "react";

import api from "../../services/api";

import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";

import { Link } from "react-router-dom";

const AddHotel = () => {

  const { token } = useAuth();

  const [hotelData, setHotelData] =
    useState({
      name: "",
      city: "",
      address: "",
      description: "",
      pricePerNight: "",
      rating: "",
      amenities: "",
    });

  const [image, setImage] =
    useState(null);

  const [loading, setLoading] =
    useState(false);


  // Handle Input
  const handleChange = (e) => {

    setHotelData({
      ...hotelData,
      [e.target.name]:
        e.target.value,
    });
  };


  // Submit Hotel
  const handleSubmit =
    async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "name",
        hotelData.name
      );

      formData.append(
        "city",
        hotelData.city
      );

      formData.append(
        "address",
        hotelData.address
      );

      formData.append(
        "description",
        hotelData.description
      );

      formData.append(
        "pricePerNight",
        hotelData.pricePerNight
      );

      formData.append(
        "rating",
        hotelData.rating
      );

      formData.append(
        "amenities",
        hotelData.amenities
      );

      if (image) {

        formData.append(
          "image",
          image
        );
      }


      // ADD HOTEL API
      await api.post(
        "/hotels/add",
        formData,
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
        "Hotel Added Successfully"
      );


      // Reset Form
      setHotelData({
        name: "",
        city: "",
        address: "",
        description: "",
        pricePerNight: "",
        rating: "",
        amenities: "",
      });

      setImage(null);

    } catch (error) {

      console.log(error);

      toast.error(
        error?.response?.data?.message ||
        "Failed to add hotel"
      );

    } finally {

      setLoading(false);
    }
  };


  return (

    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-4xl mx-auto">

        {/* Top Buttons */}
        <div className="flex justify-between items-center mb-6">

          <h1 className="text-4xl font-bold">
            Admin Dashboard
          </h1>

          <Link
            to="/admin/add-room"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold"
          >
            Add Room
          </Link>

        </div>


        {/* Add Hotel Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-3xl font-bold mb-8 text-center">
            Add Hotel
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Hotel Name */}
            <input
              type="text"
              name="name"
              placeholder="Hotel Name"
              value={hotelData.name}
              onChange={handleChange}
              className="w-full border p-4 rounded-lg"
              required
            />

            {/* City */}
            <input
              type="text"
              name="city"
              placeholder="City"
              value={hotelData.city}
              onChange={handleChange}
              className="w-full border p-4 rounded-lg"
              required
            />

            {/* Address */}
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={hotelData.address}
              onChange={handleChange}
              className="w-full border p-4 rounded-lg"
              required
            />

            {/* Description */}
            <textarea
              rows="4"
              name="description"
              placeholder="Hotel Description"
              value={hotelData.description}
              onChange={handleChange}
              className="w-full border p-4 rounded-lg"
              required
            />

            {/* Price */}
            <input
              type="number"
              name="pricePerNight"
              placeholder="Price Per Night"
              value={hotelData.pricePerNight}
              onChange={handleChange}
              className="w-full border p-4 rounded-lg"
              required
            />

            {/* Rating */}
            <input
              type="number"
              step="0.1"
              name="rating"
              placeholder="Rating (4.5)"
              value={hotelData.rating}
              onChange={handleChange}
              className="w-full border p-4 rounded-lg"
              required
            />

            {/* Amenities */}
            <input
              type="text"
              name="amenities"
              placeholder="WiFi, Pool, Gym, Spa"
              value={hotelData.amenities}
              onChange={handleChange}
              className="w-full border p-4 rounded-lg"
            />

            {/* Image */}
            <input
              type="file"
              onChange={(e) =>
                setImage(
                  e.target.files[0]
                )
              }
              className="w-full border p-4 rounded-lg"
              required
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-xl text-lg font-semibold"
            >
              {
                loading
                  ? "Adding..."
                  : "Add Hotel"
              }
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default AddHotel;