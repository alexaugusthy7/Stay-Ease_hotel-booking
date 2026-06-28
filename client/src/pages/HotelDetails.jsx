import { useEffect, useState, } from "react";

import { useParams, useNavigate, } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import api from "../services/api";

import toast from "react-hot-toast";

import { BASE_URL } from "../services/api.js";


const HotelDetails = () => {

    const { id } = useParams();

    const [hotel, setHotel] = useState(null);

    const [rooms, setRooms] = useState([]);

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    // Fetch Hotel
    const fetchHotel = async () => {
        try {

            const response =
                await api.get(
                    `/hotels/${id}`
                );

            setHotel(response.data);

        } catch (error) {

            toast.error(
                "Failed to fetch hotel"
            );

        } finally {
            setLoading(false);
        }
    };

    const fetchRooms = async () => {
        try {

            const response = await api.get(
                `/rooms/hotel/${id}`
            );

            setRooms(response.data.rooms);

        } catch (error) {

            toast.error(
                "Failed to fetch rooms"
            );
        }
    };


    useEffect(() => {
        fetchHotel();
        fetchRooms();
    }, []);


    if (loading) {
        return (
            <MainLayout>
                <h1>Loading...</h1>
            </MainLayout>
        );
    }


    return (
        <MainLayout>

            <div className="max-w-5xl mx-auto">

                {/* Hotel Image */}
                <img
                    src={`${BASE_URL}/${hotel.image}`}
                    alt={hotel.name}

                    className="w-full h-100 object-cover rounded-lg"
                />


                {/* Hotel Info */}
                <div className="mt-6">

                    <h1 className="text-5xl font-bold mb-4">
                        {hotel.name}
                    </h1>

                    <p className="text-xl text-gray-600 mb-4">
                        {hotel.city}
                    </p>

                    <p className="mb-6">
                        {hotel.description}
                    </p>



                    {/* Price */}
                    <h2 className="text-3xl font-semibold mb-6">
                        ₹{hotel.pricePerNight}
                        / night
                    </h2>


                    {/* Amenities */}
                    <div className="mb-8">

                        <h2 className="text-2xl font-bold mb-4">
                            Amenities
                        </h2>

                        <div className="flex gap-4 flex-wrap">

                            {hotel.amenities.map(
                                (item, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-200 px-4 py-2 rounded"
                                    >
                                        {item}
                                    </span>
                                )
                            )}

                        </div>

                    </div>

                    {/* Rooms */}
                    <div className="mb-10">

                        <h2 className="text-3xl font-bold mb-6">
                            Available Rooms
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {rooms.map((room) => (

                                <div
                                    key={room._id}
                                    className="border rounded-lg overflow-hidden shadow-lg"
                                >

                                    {/* Room Image */}
                                    <img
                                        src={`${BASE_URL}/${room.image}`}
                                        alt={room.roomType}
                                        className="w-full h-56 object-cover"
                                    />


                                    {/* Room Info */}
                                    <div className="p-4">

                                        <h3 className="text-2xl font-bold mb-2">
                                            {room.roomType}
                                        </h3>

                                        <p className="mb-2">
                                            Capacity:
                                            {" "}
                                            {room.capacity}
                                            {" "}
                                            Guests
                                        </p>

                                        <p className="text-xl font-semibold mb-4">
                                            ₹{room.pricePerNight}
                                        </p>


                                        <button
                                            onClick={() =>
                                                navigate(`/booking/${room._id}`)
                                            }
                                            className="bg-black text-white px-4 py-2 rounded"
                                        >
                                            Book Room
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>


                    {/* Book Button */}
                    <button className="bg-black text-white px-8 py-4 rounded text-lg">

                        Book Now

                    </button>

                </div>

            </div>

        </MainLayout>
    );
};

export default HotelDetails;