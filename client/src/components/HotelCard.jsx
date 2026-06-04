import { Link } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">

      {/* Hotel Image */}
      <img
        src={`http://localhost:5000/${hotel.image}`}
        alt={hotel.name}
        className="w-full h-56 object-cover"
      />

      {/* Hotel Info */}
      <div className="p-4">

        {/* Hotel Name */}
        <h2 className="text-2xl font-bold mb-2">
          {hotel.name}
        </h2>

        {/* City */}
        <p className="text-gray-600 mb-2">
          {hotel.city}
        </p>

        {/* Price */}
        <p className="text-lg font-semibold mb-4">
          ₹{hotel.pricePerNight}
        </p>

        {/* View Details Button */}
        <Link
          to={`/hotel/${hotel._id}`}
          className="bg-black text-white px-4 py-2 rounded"
        >
          View Details
        </Link>

      </div>
    </div>
  );
};

export default HotelCard;