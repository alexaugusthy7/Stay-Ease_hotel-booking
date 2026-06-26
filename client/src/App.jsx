import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Hotels from "./pages/Hotels";
import HotelDetails from "./pages/HotelDetails";
import Bookings from "./pages/Bookings";
import BookingPage from "./pages/BookingPage";

import Dashboard from "./admin/Dashboard";
import ManageHotels from "./admin/ManageHotels";
import ManageRooms from "./admin/ManageRooms";
import ManageBookings from "./admin/ManageBookings";


import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import AdminLayout from "./layouts/AdminLayout";
import ScrollToTop from "./components/ScrollToTop";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import MyHotels from "./pages/owner/MyHotels";
import MyRooms from "./pages/owner/MyRooms";
import OwnerBookings from "./pages/owner/OwnerBookings";
import EditHotel from "./pages/owner/EditHotel";
import EditRoom from "./pages/owner/EditRoom";
import OwnerRequests from "./admin/OwnerRequests";
import ManageUsers from "./admin/ManageUsers";
import AddHotel from "./pages/owner/AddHotel";
import AddRoom from "./pages/admin/AddRoom";


function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotel/:id" element={<HotelDetails />} />

        {/* Protected User Routes */}
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/booking/:roomId"
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes with Layout */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Dashboard />} />

          <Route
            path="hotels"
            element={<ManageHotels />}
          />

          <Route
            path="rooms"
            element={<ManageRooms />}
          />

          <Route
            path="bookings"
            element={<ManageBookings />}
          />

          {/* Owner Requests */}
          <Route
            path="owner-requests"
            element={<OwnerRequests />}
          />

          {/* Manage Users */}
          <Route
            path="users"
            element={<ManageUsers />}
          />
        </Route>

        <Route path="/owner/dashboard" element={<OwnerDashboard />} />

        <Route path="/owner/hotels" element={<MyHotels />} />

        <Route path="/owner/rooms" element={<MyRooms />} />

        <Route path="/owner/bookings" element={<OwnerBookings />} />

        <Route path="/owner/edit-hotel/:id" element={<EditHotel />} />

        <Route path="/owner/edit-room/:id" element={<EditRoom />} />

        <Route path="/admin/add-hotel" element={<AddHotel />} />

        <Route path="/admin/add-room/:id" element={<AddRoom />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;