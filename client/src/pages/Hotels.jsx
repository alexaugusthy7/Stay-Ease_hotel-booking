import {
  useEffect,
  useState,
} from "react";

import MainLayout
  from "../layouts/MainLayout";

import api from "../services/api";

import HotelCard
  from "../components/HotelCard";

import toast from "react-hot-toast";


const Hotels = () => {

  const [hotels, setHotels] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // Search States
  const [city, setCity] =
    useState("");

  const [minPrice, setMinPrice] =
    useState("");

  const [maxPrice, setMaxPrice] =
    useState("");


  // Fetch Hotels
  const fetchHotels = async () => {

    try {

      setLoading(true);

      const response =
        await api.get(
          `/hotels?city=${city}&minPrice=${minPrice}&maxPrice=${maxPrice}`
        );

      setHotels(response.data.hotels);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to fetch hotels"
      );

    } finally {

      setLoading(false);
    }
  };


  useEffect(() => {
    fetchHotels();
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

      <div>

        {/* Heading */}
        <h1 className="text-4xl font-bold mb-8">
          Explore Hotels
        </h1>


        {/* Search Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">

          {/* City */}
          <input
            type="text"
            placeholder="Search City"
            value={city}
            onChange={(e) =>
              setCity(e.target.value)
            }
            className="border p-3 rounded w-full"
          />


          {/* Min Price */}
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) =>
              setMinPrice(e.target.value)
            }
            className="border p-3 rounded w-full"
          />


          {/* Max Price */}
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(e.target.value)
            }
            className="border p-3 rounded w-full"
          />


          {/* Search Button */}
          <button
            onClick={fetchHotels}
            className="bg-black text-white px-6 py-3 rounded"
          >
            Search
          </button>

        </div>


        {/* Hotel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {hotels.length > 0 ? (

            hotels.map((hotel) => (
              <HotelCard
                key={hotel._id}
                hotel={hotel}
              />
            ))

          ) : (

            <h1>
              No Hotels Found
            </h1>

          )}

        </div>

      </div>

    </MainLayout>
  );
};

export default Hotels;