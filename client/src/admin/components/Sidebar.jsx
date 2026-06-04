import { Link } from "react-router-dom";

const Sidebar = () => {

  return (

    <div className="w-64 min-h-screen bg-black text-white p-5">

      <h1 className="text-2xl font-bold mb-10">
        Admin Panel
      </h1>

      <div className="flex flex-col gap-5">

        <Link to="/">🏠 Home</Link>

        <Link
          to="/admin"
          className="hover:text-gray-300"
        >
          Dashboard
        </Link>

        <Link
          to="/admin/hotels"
          className="hover:text-gray-300"
        >
          Manage Hotels
        </Link>

        <Link
          to="/admin/rooms"
          className="hover:text-gray-300"
        >
          Manage Rooms
        </Link>

        <Link
          to="/admin/bookings"
          className="hover:text-gray-300"
        >
          Manage Bookings
        </Link>

      </div>

    </div>
  );
};

export default Sidebar;