import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import { assets, cities } from "../assets/assets";

import toast from "react-hot-toast";

import api from "../services/api";

const Home = () => {

  const navigate = useNavigate();

  // Search States
  const [city, setCity] =
    useState("");

  const [minPrice, setMinPrice] =
    useState("");

  const [maxPrice, setMaxPrice] =
    useState("");

  const [guests, setGuests] =
    useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const [reviewData, setReviewData] = useState({
    name: "",
    city: "",
    review: "",
  });

  // Handle Search
  const handleSearch = (e) => {

    e.preventDefault();

    navigate(
      `/hotels?city=${city}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
  };

  const handleReviewSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await api.post(
        "/reviews/add",
        {
          name: reviewData.name,
          rating: 5,
          comment: reviewData.review,
        }
      );

      console.log(response.data);

      toast.success("Review Added Successfully");

      setReviewData({
        name: "",
        city: "",
        review: "",
      });

      setShowReviewForm(false);

    } catch (error) {

      console.log(error);

      toast.error("Failed to add review");
    }
  };

  return (

    <MainLayout noPadding={true}>

      {/* HERO SECTION */}
      <div
        style={{
          backgroundImage:
            `url(${assets.heroImage})`,
        }}
        className="flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-no-repeat bg-cover bg-center h-screen"
      >

        <p className="bg-[#49B9FF]/50 px-4 py-1 rounded-full mt-20 backdrop-blur-sm">

          The Ultimate Hotel Experience

        </p>

        <h1 className="font-playfair text-3xl md:text-6xl font-bold max-w-2xl mt-6 leading-tight">

          Discover Your Perfect Gateway Destination

        </h1>

        <p className="max-w-xl mt-4 text-sm md:text-lg text-gray-200">

          Unparalleled luxury and comfort await at the world's most exclusive hotels and resorts.

        </p>

        <form
          onSubmit={handleSearch}
          className="bg-white text-gray-600 rounded-2xl px-6 py-5 flex flex-col md:flex-row gap-5 mt-8 shadow-2xl w-full max-w-6xl"
        >

          {/* Destination */}
          <div className="flex flex-col flex-1">

            <label className="font-semibold mb-2">

              Destination

            </label>

            <input
              list="destinations"
              type="text"
              placeholder="Search city"
              value={city}
              onChange={(e) =>
                setCity(e.target.value)
              }
              className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
            />

            <datalist id="destinations">

              {cities.map((city, index) => (
                <option
                  value={city}
                  key={index}
                />
              ))}

            </datalist>

          </div>

          {/* Min Price */}
          <div className="flex flex-col">

            <label className="font-semibold mb-2">

              Min Price

            </label>

            <input
              type="number"
              placeholder="1000"
              value={minPrice}
              onChange={(e) =>
                setMinPrice(e.target.value)
              }
              className="border border-gray-300 rounded-lg px-4 py-2 outline-none w-32"
            />

          </div>

          {/* Max Price */}
          <div className="flex flex-col">

            <label className="font-semibold mb-2">

              Max Price

            </label>

            <input
              type="number"
              placeholder="5000"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(e.target.value)
              }
              className="border border-gray-300 rounded-lg px-4 py-2 outline-none w-32"
            />

          </div>

          {/* Guests */}
          <div className="flex flex-col">

            <label className="font-semibold mb-2">

              Guests

            </label>

            <input
              type="number"
              min={1}
              value={guests}
              onChange={(e) =>
                setGuests(e.target.value)
              }
              className="border border-gray-300 rounded-lg px-4 py-2 outline-none w-24"
            />

          </div>

          {/* Search Button */}
          <div className="flex items-end">

            <button
              type="submit"
              className="bg-black hover:bg-gray-800 transition text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
            >

              <img
                src={assets.searchIcon}
                alt=""
                className="h-4"
              />

              Search

            </button>

          </div>

        </form>

      </div>


      {/* FEATURES SECTION */}
      <div className="py-20 px-6 md:px-16 lg:px-24 bg-gray-100">

        <div className="text-center mb-14">

          <h2 className="text-4xl font-bold mb-4">

            Why Choose Us

          </h2>

          <p className="text-gray-600 text-lg">

            Discover luxury, comfort and unforgettable experiences.

          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* CARD 1 */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition duration-300">

            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
              alt=""
              className="h-64 w-full object-cover"
            />

            <div className="p-6">

              <h3 className="text-2xl font-bold mb-3">

                Luxury Rooms

              </h3>

              <p className="text-gray-600 mb-5">

                Elegant rooms designed with premium comfort and modern interiors.

              </p>

              <button
                onClick={() => navigate("/hotels")}
                className="bg-black text-white px-5 py-2 rounded-lg"
              >
                Explore
              </button>

            </div>

          </div>

          {/* CARD 2 */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition duration-300">

            <img
              src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa"
              alt=""
              className="h-64 w-full object-cover"
            />

            <div className="p-6">

              <h3 className="text-2xl font-bold mb-3">

                Fine Dining

              </h3>

              <p className="text-gray-600 mb-5">

                Enjoy world-class cuisines prepared by top professional chefs.

              </p>

              <button
                onClick={() => navigate("/hotels")}
                className="bg-black text-white px-5 py-2 rounded-lg"
              >
                Explore
              </button>

            </div>

          </div>

          {/* CARD 3 */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition duration-300">

            <img
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
              alt=""
              className="h-64 w-full object-cover"
            />

            <div className="p-6">

              <h3 className="text-2xl font-bold mb-3">

                Swimming Pool

              </h3>

              <p className="text-gray-600 mb-5">

                Relax and refresh yourself in luxurious infinity pools.

              </p>

              <button
                onClick={() => navigate("/hotels")}
                className="bg-black text-white px-5 py-2 rounded-lg"
              >
                Explore
              </button>

            </div>

          </div>

        </div>

      </div>
      {/* DESTINATIONS SECTION */}
      <div className="py-20 px-6 md:px-16 lg:px-24 bg-white">

        {/* Heading */}
        <div className="text-center mb-14">

          <h2 className="text-4xl font-bold mb-4">

            Explore Popular Indian Destinations

          </h2>

          <p className="text-gray-600 text-lg">

            Discover luxury stays across India's most beautiful travel destinations.

          </p>

        </div>

        {/* Destination Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* CARD 1 - GOA */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl 
  hover:shadow-2xl hover:-translate-y-3 hover:scale-105 
  transition-all duration-500 cursor-pointer">

            <div className="overflow-hidden">

              <img
                src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop"
                alt="Goa"
                className="h-64 w-full object-cover hover:scale-110 transition-all duration-700"
              />

            </div>

            <div className="p-6">

              <h3 className="text-2xl font-bold">
                Goa
              </h3>

              <p className="text-gray-500 mt-3 leading-7">

                Beach resorts, nightlife and luxury seaside stays.

              </p>

            </div>

          </div>


          {/* CARD 2 - KERALA */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl 
  hover:shadow-2xl hover:-translate-y-3 hover:scale-105 
  transition-all duration-500 cursor-pointer">

            <div className="overflow-hidden">

              <img
                src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop"
                alt="Kerala"
                className="h-64 w-full object-cover hover:scale-110 transition-all duration-700"
              />

            </div>

            <div className="p-6">

              <h3 className="text-2xl font-bold">
                Kerala
              </h3>

              <p className="text-gray-500 mt-3 leading-7">

                Backwaters, greenery and premium luxury resorts.

              </p>

            </div>

          </div>


          {/* CARD 3 - JAIPUR */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl 
  hover:shadow-2xl hover:-translate-y-3 hover:scale-105 
  transition-all duration-500 cursor-pointer">

            <div className="overflow-hidden">

              <img
                src="https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop"
                alt="Jaipur"
                className="h-64 w-full object-cover hover:scale-110 transition-all duration-700"
              />

            </div>

            <div className="p-6">

              <h3 className="text-2xl font-bold">
                Jaipur
              </h3>

              <p className="text-gray-500 mt-3 leading-7">

                Royal palaces, heritage hotels and cultural experiences.

              </p>

            </div>

          </div>


          {/* CARD 4 - MANALI */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl 
  hover:shadow-2xl hover:-translate-y-3 hover:scale-105 
  transition-all duration-500 cursor-pointer">

            <div className="overflow-hidden">

              <img
                src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop"
                alt="Manali"
                className="h-64 w-full object-cover hover:scale-110 transition-all duration-700"
              />

            </div>

            <div className="p-6">

              <h3 className="text-2xl font-bold">
                Manali
              </h3>

              <p className="text-gray-500 mt-3 leading-7">

                Snow mountains, adventure tourism and cozy resorts.

              </p>

            </div>

          </div>

        </div>

        {/* VIEW ALL BUTTON */}
        <div className="flex justify-center mt-12">

          <button
            onClick={() => navigate("/hotels")}
            className="bg-black hover:bg-gray-800 transition text-white px-8 py-4 rounded-xl text-lg font-semibold"
          >
            View All Destinations
          </button>

        </div>

        {/* MAP SECTION */}
        <div className="mt-20">

          <h2 className="text-4xl font-bold text-center mb-10">

            Explore Hotels Across India

          </h2>

          <div className="rounded-3xl overflow-hidden shadow-2xl">

            <iframe
              title="india-map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30474433.522422656!2d72.75633121495476!3d20.19136287539132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

          </div>

        </div>

      </div>
      {/* REVIEWS SECTION */}
      <div className="mt-24">

        {/* Heading */}
        <div className="text-center mb-14">

          <h2 className="text-4xl font-bold mb-4">

            What Our Guests Say

          </h2>

          <p className="text-gray-600 text-lg">

            Real reviews from travelers across India.

          </p>

        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* REVIEW 1 */}
          <div
            className="bg-white rounded-3xl shadow-xl p-8 border
      hover:shadow-2xl hover:-translate-y-3 hover:scale-105
      transition-all duration-500 cursor-pointer"
          >

            <div className="flex items-center gap-4 mb-5">

              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt=""
                className="w-16 h-16 rounded-full object-cover hover:scale-110 transition duration-500"
              />

              <div>

                <h3 className="text-xl font-bold">
                  Rahul Sharma
                </h3>

                <p className="text-gray-500">
                  Mumbai
                </p>

              </div>

            </div>

            <div className="text-yellow-500 text-xl mb-4">

              ★★★★★

            </div>

            <p className="text-gray-600 leading-7">

              Amazing hotel booking experience. The rooms were clean, luxurious and exactly as shown on the website.

            </p>

          </div>


          {/* REVIEW 2 */}
          <div
            className="bg-white rounded-3xl shadow-xl p-8 border
      hover:shadow-2xl hover:-translate-y-3 hover:scale-105
      transition-all duration-500 cursor-pointer"
          >

            <div className="flex items-center gap-4 mb-5">

              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt=""
                className="w-16 h-16 rounded-full object-cover hover:scale-110 transition duration-500"
              />

              <div>

                <h3 className="text-xl font-bold">
                  Anjali Nair
                </h3>

                <p className="text-gray-500">
                  Kerala
                </p>

              </div>

            </div>

            <div className="text-yellow-500 text-xl mb-4">

              ★★★★★

            </div>

            <p className="text-gray-600 leading-7">

              Smooth booking process and excellent customer support. Loved the Kerala resort recommendations.

            </p>

          </div>


          {/* REVIEW 3 */}
          <div
            className="bg-white rounded-3xl shadow-xl p-8 border
      hover:shadow-2xl hover:-translate-y-3 hover:scale-105
      transition-all duration-500 cursor-pointer"
          >

            <div className="flex items-center gap-4 mb-5">

              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt=""
                className="w-16 h-16 rounded-full object-cover hover:scale-110 transition duration-500"
              />

              <div>

                <h3 className="text-xl font-bold">
                  Arjun Patel
                </h3>

                <p className="text-gray-500">
                  Gujarat
                </p>

              </div>

            </div>

            <div className="text-yellow-500 text-xl mb-4">

              ★★★★★

            </div>

            <p className="text-gray-600 leading-7">

              One of the best hotel booking platforms I have used. Beautiful UI and premium hotel collections.

            </p>

          </div>

        </div>

        {/* ADD REVIEW BUTTON */}
        <div className="flex justify-center mt-10">

          <button
            onClick={() =>
              setShowReviewForm(true)
            }
            className="bg-black hover:bg-gray-800 hover:scale-105 active:scale-95
  transition-all duration-300 text-white px-6 py-3 rounded-xl
  text-base font-semibold shadow-lg"
          >
            Add Review
          </button>

          {/* REVIEW FORM */}
          {showReviewForm && (

            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

              <div className="bg-white rounded-3xl p-8 w-[90%] max-w-lg relative">

                {/* Close Button */}
                <button
                  onClick={() =>
                    setShowReviewForm(false)
                  }
                  className="absolute top-4 right-4 text-2xl"
                >
                  ✕
                </button>

                <h2 className="text-3xl font-bold mb-6 text-center">

                  Add Your Review

                </h2>

                <form
                  onSubmit={handleReviewSubmit}
                  className="space-y-4"
                >

                  <input
                    type="text"
                    placeholder="Your Name"
                    value={reviewData.name}
                    onChange={(e) =>
                      setReviewData({
                        ...reviewData,
                        name: e.target.value,
                      })
                    }
                    className="w-full border p-3 rounded-xl"
                    required
                  />

                  <input
                    type="text"
                    placeholder="Your City"
                    value={reviewData.city}
                    onChange={(e) =>
                      setReviewData({
                        ...reviewData,
                        city: e.target.value,
                      })
                    }
                    className="w-full border p-3 rounded-xl"
                    required
                  />

                  <textarea
                    placeholder="Write your review..."
                    rows="4"
                    value={reviewData.review}
                    onChange={(e) =>
                      setReviewData({
                        ...reviewData,
                        review: e.target.value,
                      })
                    }
                    className="w-full border p-3 rounded-xl"
                    required
                  />

                  <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
                  >
                    Submit Review
                  </button>

                </form>

              </div>

            </div>
          )}

        </div>

      </div>

      {/* NEWSLETTER SECTION */}
      <div className="mt-28 mb-10">

        <div
          className="relative rounded-[40px] overflow-hidden bg-linear-to-r from-black via-gray-900 to-black px-8 md:px-16 py-16 shadow-2xl"
        >

          {/* Background Overlay */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center"></div>

          {/* Content */}
          <div className="relative z-10 text-center text-white">

            <h2 className="text-4xl md:text-5xl font-bold mb-5">

              Get Exclusive Hotel Deals

            </h2>

            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-8">

              Subscribe to our newsletter and receive special discounts,
              luxury hotel offers and travel updates across India.

            </p>

            {/* FORM */}
            <form
              className="mt-10 flex flex-col md:flex-row items-center
        justify-center gap-4 max-w-3xl mx-auto"
            >

              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full md:flex-1 px-6 py-4 rounded-2xl
          text-black outline-none text-lg shadow-lg"
              />

              <button
                type="submit"
                className="bg-white text-black px-8 py-4 rounded-2xl
          font-bold hover:scale-105 hover:bg-gray-200
          transition-all duration-300 shadow-xl"
              >

                Subscribe

              </button>

            </form>

            {/* SMALL TEXT */}
            <p className="text-gray-400 text-sm mt-5">

              Join thousands of travelers receiving weekly luxury stay offers.

            </p>

          </div>

        </div>

      </div>

    </MainLayout>
  );
};

export default Home;