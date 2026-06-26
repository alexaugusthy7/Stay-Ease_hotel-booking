import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

const EditHotel = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [hotel, setHotel] = useState({
    name: "",
    city: "",
    address: "",
    description: "",
    pricePerNight: "",
  });

  useEffect(() => {

    fetchHotel();

  }, []);

  const fetchHotel = async () => {

    try {

      const response =
        await api.get(`/hotels/${id}`);

      setHotel(response.data);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to load hotel"
      );

    }

  };

  const handleChange = (e) => {

    setHotel({
      ...hotel,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem("token");

      await api.put(
        `/hotels/update/${id}`,
        hotel,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Hotel Updated Successfully"
      );

      navigate("/owner/hotels");

    } catch (error) {

      console.log(error);

      toast.error(
        "Update Failed"
      );

    }

  };

  return (

    <div className="max-w-3xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-6">

        Edit Hotel

      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          name="name"
          placeholder="Hotel Name"
          value={hotel.name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={hotel.city}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={hotel.address}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          name="pricePerNight"
          placeholder="Price"
          value={hotel.pricePerNight}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={hotel.description}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          rows="5"
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded"
        >
          Update Hotel
        </button>

      </form>

    </div>

  );

};

export default EditHotel;