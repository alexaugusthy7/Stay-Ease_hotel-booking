import {
  useEffect,
  useState,
} from "react";

import api from "../services/api";

import toast from "react-hot-toast";

import { BASE_URL } from "../services/api";

const ManageRooms = () => {

  const [rooms, setRooms] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [formData, setFormData] =
    useState({
      hotel: "",
      roomType: "",
      pricePerNight: "",
      capacity: "",
      amenities: "",
    });

  const [image, setImage] =
    useState(null);

  const [editingId, setEditingId] =
    useState(null);

  const fetchRooms = async () => {

    try {

      const response =
        await api.get("/rooms");

        console.log(response.data);

      setRooms(response.data.rooms || []);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to fetch rooms"
      );

    } finally {

      setLoading(false);
    }
  };


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };


  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const data =
        new FormData();

      Object.keys(formData).forEach(
        (key) => {

          data.append(
            key,
            formData[key]
          );
        }
      );

      if (image) {

        data.append(
          "image",
          image
        );
      }

      // UPDATE ROOM
      if (editingId) {

        await api.put(
          `/rooms/update/${editingId}`,
          data,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        toast.success(
          "Room updated successfully"
        );

      } else {

        // ADD ROOM
        await api.post(
          "/rooms/add",
          data,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        toast.success(
          "Room added successfully"
        );
      }

      // RESET FORM
      setFormData({
        hotel: "",
        roomType: "",
        pricePerNight: "",
        capacity: "",
        amenities: "",
      });

      setImage(null);

      setEditingId(null);

      fetchRooms();

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Operation failed"
      );
    }
  };


  // ================= DELETE ROOM =================
  const deleteRoom = async (
    id
  ) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this room?"
      );

    if (!confirmDelete) return;

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await api.delete(
        `/rooms/delete/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Room deleted successfully"
      );

      fetchRooms();

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to delete room"
      );
    }
  };


  // ================= EDIT ROOM =================
  const editRoom = (room) => {

    setEditingId(room._id);

    setFormData({
      hotel:
        room.hotel?._id || "",
      roomType:
        room.roomType,
      pricePerNight:
        room.pricePerNight,
      capacity:
        room.capacity,
      amenities:
        room.amenities?.join(", "),
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  // ================= LOAD DATA =================
  useEffect(() => {

    fetchRooms();

  }, []);


  // ================= LOADING =================
  if (loading) {

    return (

      <div className="flex justify-center items-center h-64">

        <h1 className="text-2xl font-bold">
          Loading Rooms...
        </h1>

      </div>
    );
  }


  return (

    <div className="p-6">

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold mb-8">
        Manage Rooms
      </h1>


      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 mb-10 space-y-4"
      >

        <h2 className="text-2xl font-bold">

          {editingId
            ? "Update Room"
            : "Add New Room"}

        </h2>

        <input
          type="text"
          name="hotel"
          placeholder="Hotel ID"
          value={formData.hotel}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          type="text"
          name="roomType"
          placeholder="Room Type"
          value={formData.roomType}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          type="number"
          name="pricePerNight"
          placeholder="Price Per Night"
          value={formData.pricePerNight}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={formData.capacity}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          type="text"
          name="amenities"
          placeholder="Amenities (comma separated)"
          value={formData.amenities}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="file"
          onChange={(e) =>
            setImage(
              e.target.files[0]
            )
          }
          className="w-full"
        />

        <button
          type="submit"
          className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition"
        >

          {editingId
            ? "Update Room"
            : "Add Room"}

        </button>

      </form>


      {/* ROOM LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {rooms.map((room) => (

          <div
            key={room._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border"
          >

            {/* IMAGE */}
            <img
              src={
                room.image?.startsWith(
                  "http"
                )
                  ? room.image
                  : `${BASE_URL}/${room.image}`
              }
              alt={room.roomType}
              className="w-full h-52 object-cover"
            />


            {/* CONTENT */}
            <div className="p-5">

              <h2 className="text-2xl font-bold">
                {room.roomType}
              </h2>

              <p className="text-gray-500 mt-1">
                Hotel:
                {" "}
                {room.hotel?.name}
              </p>

              <p className="mt-3 text-lg font-semibold">
                ₹{room.pricePerNight}
                {" "}
                / night
              </p>

              <p className="mt-1">
                Capacity:
                {" "}
                {room.capacity}
              </p>


              {/* AMENITIES */}
              <div className="flex flex-wrap gap-2 mt-4">

                {room.amenities?.map(
                  (item, index) => (

                    <span
                      key={index}
                      className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                    >
                      {item}
                    </span>
                  )
                )}

              </div>


              {/* ACTION BUTTONS */}
              <div className="flex gap-3 mt-5">

                <button
                  onClick={() =>
                    editRoom(room)
                  }
                  className="bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-2 rounded-lg w-full"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteRoom(
                      room._id
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

    </div>
  );
};

export default ManageRooms;