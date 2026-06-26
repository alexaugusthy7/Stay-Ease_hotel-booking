import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import MainLayout
  from "../layouts/MainLayout";

import api from "../services/api";

import {
  useAuth,
} from "../context/AuthContext";

import toast from "react-hot-toast";


const Login = () => {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });


  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };


  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response =
        await api.post(
          "/auth/login",
          formData
        );

      toast.success(
        "Login successful"
      );

      // Save User + Token
      login(
        response.data.user,
        response.data.token
      );

      const user = response.data.user;

      if (user.role === "admin") {

        navigate("/admin");

      } else if (
        user.role === "hotelOwner"
      ) {

        navigate("/");

      } else {

        navigate("/");

      }

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Invalid credentials"
      );
    }
  };


  return (
    <MainLayout>

      <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>


        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"

            value={formData.email}

            onChange={handleChange}

            className="w-full border p-3 rounded"

            required
          />


          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"

            value={formData.password}

            onChange={handleChange}

            className="w-full border p-3 rounded"

            required
          />


          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded"
          >
            Login
          </button>

        </form>

      </div>

    </MainLayout>
  );
};

export default Login;