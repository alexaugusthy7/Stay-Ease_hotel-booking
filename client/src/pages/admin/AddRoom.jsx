import { useEffect, useState } from "react";

import api from "../../services/api";

import { useAuth } from "../../context/AuthContext";

import toast from "react-hot-toast";

import { useParams } from "react-router-dom";

const AddRoom = () => {

  const { token } = useAuth();
  const { hotelId } = useParams();

  const [hotels, setHotels] =
    useState([]);

  const [hotel, setHotel] =
    useState("");

  const [roomType, setRoomType] =
    useState("");

  const [pricePerNight, setPricePerNight] =
    useState("");

  const [capacity, setCapacity] =
    useState("");

  const [amenities, setAmenities] =
    useState("");

  const [image, setImage] =
    useState(null);


  // Fetch Hotels
  const fetchHotels = async () => {

    try {

      const response =
        await api.get("/hotels");

      setHotels(
        response.data.hotels
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to fetch hotels"
      );
    }
  };


  useEffect(() => {
    fetchHotels();
  }, []);


  // Submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const formData =
        new FormData();

      formData.append(
        "hotel",
        hotel
      );

      formData.append(
        "roomType",
        roomType
      );

      formData.append(
        "pricePerNight",
        pricePerNight
      );

      formData.append(
        "capacity",
        capacity
      );

      formData.append(
        "amenities",
        amenities
      );

      formData.append(
        "image",
        image
      );


      await api.post(
        "/rooms/add",
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
        "Room added successfully"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to add room"
      );
    }
  };


  return (

    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow mt-10">

      <h1 className="text-3xl font-bold mb-6">
        Add Room
      </h1>


      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        {/* Select Hotel */}
        <select
          value={hotel}
          onChange={(e) =>
            setHotel(e.target.value)
          }
          className="w-full border p-3 rounded"
          required
        >

          <option value="">
            Select Hotel
          </option>

          {hotels.map((hotel) => (

            <option
              key={hotel._id}
              value={hotel._id}
            >
              {hotel.name}
            </option>

          ))}

        </select>


        {/* Room Type */}
        <input
          type="text"
          placeholder="Room Type"
          value={roomType}
          onChange={(e) =>
            setRoomType(
              e.target.value
            )
          }
          className="w-full border p-3 rounded"
          required
        />


        {/* Price */}
        <input
          type="number"
          placeholder="Price Per Night"
          value={pricePerNight}
          onChange={(e) =>
            setPricePerNight(
              e.target.value
            )
          }
          className="w-full border p-3 rounded"
          required
        />


        {/* Capacity */}
        <input
          type="number"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) =>
            setCapacity(
              e.target.value
            )
          }
          className="w-full border p-3 rounded"
          required
        />


        {/* Amenities */}
        <input
          type="text"
          placeholder="Amenities"
          value={amenities}
          onChange={(e) =>
            setAmenities(
              e.target.value
            )
          }
          className="w-full border p-3 rounded"
        />


        {/* Image */}
        <input
          type="file"
          onChange={(e) =>
            setImage(
              e.target.files[0]
            )
          }
          className="w-full"
          required
        />


        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded"
        >
          Add Room
        </button>

      </form>

    </div>
  );
};

export default AddRoom;