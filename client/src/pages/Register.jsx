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


const Register = () => {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] =
    useState({
      username: "",
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
          "/auth/register",
          formData
        );

      toast.success(
        "Registration successful"
      );

      // Auto login
      login(
        response.data.user,
        response.data.token
      );

      navigate("/");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };


  return (
    <MainLayout>

      <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Register
        </h1>


        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* Username */}
          <input
            type="text"
            name="username"
            placeholder="Username"

            value={formData.username}

            onChange={handleChange}

            className="w-full border p-3 rounded"

            required
          />


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
            className="w-full bg-blue-500 text-white py-3 rounded"
          >
            Register
          </button>

        </form>

      </div>

    </MainLayout>
  );
};

export default Register;