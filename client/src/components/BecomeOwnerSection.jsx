import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const BecomeOwnerSection = () => {

    const [formData, setFormData] = useState({
        hotelName: "",
        location: "",
        rooms: "",
        phone: "",
        message: "",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token =
                localStorage.getItem("token");

            await api.post(
                "/owner-request/request",
                {
                    hotelName:
                        formData.hotelName,

                    location:
                        formData.location,

                    rooms:
                        formData.rooms,

                    phone:
                        formData.phone,

                    message:
                        formData.message,
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            toast.success(
                "Request sent successfully"
            );

            setFormData({
                hotelName: "",
                location: "",
                rooms: "",
                phone: "",
                message: "",
            });

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to send request"
            );

        }

    };

    return (

        <section className="py-16 bg-gray-100">

            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">

                <h2 className="text-3xl font-bold text-center mb-4">
                    Become a Hotel Partner
                </h2>

                <p className="text-center text-gray-500 mb-8">
                    Own a hotel? Join StayEase and reach thousands of travelers.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="text"
                        name="hotelName"
                        placeholder="Hotel Name"
                        value={formData.hotelName}
                        onChange={handleChange}
                        required
                        className="w-full border p-3 rounded"
                    />

                    <input
                        type="text"
                        name="location"
                        placeholder="Hotel Location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="w-full border p-3 rounded"
                    />

                    <input
                        type="number"
                        name="rooms"
                        placeholder="Number of Rooms"
                        value={formData.rooms}
                        onChange={handleChange}
                        required
                        className="w-full border p-3 rounded"
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full border p-3 rounded"
                    />

                    <textarea
                        name="message"
                        placeholder="Tell us about your hotel..."
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        required
                        className="w-full border p-3 rounded"
                    />

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded hover:bg-gray-800"
                    >
                        Send Request
                    </button>

                </form>

            </div>

        </section>

    );

};

export default BecomeOwnerSection;