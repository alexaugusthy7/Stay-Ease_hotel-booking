import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

const MyRooms = () => {

  const [rooms, setRooms] = useState([]);

  const navigate = useNavigate();

  useEffect(() => { fetchRooms(); }, []);

  const fetchRooms = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await api.get(
          "/rooms/my-rooms",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setRooms(
        response.data.rooms
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to load rooms"
      );

    }

  };

  const deleteRoom = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

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

      setRooms(
        rooms.filter(
          room => room._id !== id
        )
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Delete failed"
      );

    }

  };

  return (

    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        My Rooms
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {rooms.map((room) => (

          <div
            key={room._id}
            className="bg-white shadow-lg rounded-xl p-4"
          >
            {room.image && (
                <img
                  src={
                    room.image.startsWith("http")
                      ? room.image
                      : `http://localhost:5000/${room.image}`
                  }
                  alt={room.hotel.name}
                  className="w-full h-48 object-cover"
                />
              )}

            <h2 className="text-xl font-bold">
              {room.roomType}
            </h2>

            <p>
              Hotel:
              {" "}
              {room.hotel?.name}
            </p>

            <p>
              ₹{room.pricePerNight}
            </p>

            <p>
              Capacity:
              {" "}
              {room.capacity}
            </p>

            <div className="mt-4 flex gap-2">

              <button
                onClick={() =>
                  navigate(
                    `/owner/edit-room/${room._id}`
                  )
                }
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteRoom(room._id)
                }
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default MyRooms;