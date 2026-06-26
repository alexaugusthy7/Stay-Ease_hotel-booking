import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

const EditRoom = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState({
    roomType: "",
    pricePerNight: "",
    capacity: "",
    amenities: "",
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchRoom();
  }, []);

  const fetchRoom = async () => {

    try {

      const response =
        await api.get(`/rooms/${id}`);

      setRoom({
        roomType:
          response.data.roomType || "",

        pricePerNight:
          response.data.pricePerNight || "",

        capacity:
          response.data.capacity || "",

        amenities:
          response.data.amenities?.join(", ") || "",
      });

    } catch (error) {

      console.log(error);

      toast.error("Failed to load room");

    }

  };

  const handleChange = (e) => {

    setRoom({
      ...room,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem("token");

      const formData = new FormData();

      formData.append(
        "roomType",
        room.roomType
      );

      formData.append(
        "pricePerNight",
        room.pricePerNight
      );

      formData.append(
        "capacity",
        room.capacity
      );

      formData.append(
        "amenities",
        room.amenities
      );

      if (image) {
        formData.append(
          "image",
          image
        );
      }

      await api.put(
        `/rooms/update/${id}`,
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
        "Room updated successfully"
      );

      navigate("/owner/rooms");

    } catch (error) {

      console.log(error);

      toast.error("Update failed");

    }

  };

  return (

    <div className="max-w-3xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-6">
        Edit Room
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          name="roomType"
          placeholder="Room Type"
          value={room.roomType}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          name="pricePerNight"
          placeholder="Price Per Night"
          value={room.pricePerNight}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={room.capacity}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="amenities"
          placeholder="WiFi, AC, TV"
          value={room.amenities}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImage(e.target.files[0])
          }
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded"
        >
          Update Room
        </button>

      </form>

    </div>

  );

};

export default EditRoom;