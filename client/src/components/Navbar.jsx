import React, { useEffect, useState, } from "react";

import { Link, useLocation, } from "react-router-dom";

import { useAuth, } from "../context/AuthContext";

import api from "../services/api";

import toast from "react-hot-toast";

const Navbar = () => {

  const {
    user,
    logout,
  } = useAuth();

  const location =
    useLocation();

  const [isScrolled, setIsScrolled] =
    useState(false);

  const [isMenuOpen, setIsMenuOpen] =
    useState(false);


  // Scroll Effect
  useEffect(() => {

    if (
      location.pathname !== "/"
    ) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {

      setIsScrolled(
        window.scrollY > 10
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );

  }, [location.pathname]);


  return (

    <nav
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 transition-all duration-500
      ${isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-md py-4 text-gray-800"
          : "bg-transparent py-6 text-white"
        }`}
    >

      {/* Logo */}
      <Link
        to="/"
        className="text-3xl font-bold tracking-wide"
      >
        StayEase
      </Link>


      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">

        <Link
          to="/"
          className="hover:text-gray-300 transition"
        >
          Home
        </Link>

        <Link
          to="/hotels"
          className="hover:text-gray-300 transition"
        >
          Hotels
        </Link>

        <Link
          to="/bookings"
          className="hover:text-gray-300 transition"
        >
          Bookings
        </Link>

        {user?.role === "admin" && (
          <Link
            to="/admin"
            className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition"
          >
            Admin Dashboard
          </Link>
        )}

        {user?.role === "hotelOwner" && (
          <Link
            to="/owner/dashboard"
            className="hover:text-blue-500"
          >
            Owner Dashboard
          </Link>
        )}




        {/* User */}
        {user ? (

          <div className="flex items-center gap-4">

            <span className="font-medium">
              Hello, {user.username}
            </span>

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full transition"
            >
              Logout
            </button>

          </div>

        ) : (

          <div className="flex items-center gap-4">

            <Link
              to="/login"
              className={`px-6 py-2 rounded-full transition
              ${isScrolled
                  ? "bg-black text-white"
                  : "bg-white text-black"
                }`}
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition"
            >
              Register
            </Link>

          </div>

        )}

      </div>


      {/* Mobile Menu Button */}
      <button
        onClick={() =>
          setIsMenuOpen(
            !isMenuOpen
          )
        }
        className="md:hidden text-3xl"
      >
        ☰
      </button>


      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-gray-800 flex flex-col items-center justify-center gap-8 text-xl transition-all duration-500 md:hidden
        ${isMenuOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }`}
      >

        {/* Close */}
        <button
          onClick={() =>
            setIsMenuOpen(false)
          }
          className="absolute top-6 right-6 text-4xl"
        >
          ×
        </button>


        <Link
          to="/"
          onClick={() =>
            setIsMenuOpen(false)
          }
        >
          Home
        </Link>

        <Link
          to="/hotels"
          onClick={() =>
            setIsMenuOpen(false)
          }
        >
          Hotels
        </Link>

        <Link
          to="/bookings"
          onClick={() =>
            setIsMenuOpen(false)
          }
        >
          Bookings
        </Link>


        {user ? (

          <>

            <span>
              Hello, {user.username}
            </span>

            <button
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }}
              className="bg-red-500 text-white px-6 py-2 rounded-full"
            >
              Logout
            </button>

          </>

        ) : (

          <div className="flex flex-col gap-4">

            <Link
              to="/login"
              className="bg-black text-white px-8 py-3 rounded-full text-center"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-blue-500 text-white px-8 py-3 rounded-full text-center"
            >
              Register
            </Link>

          </div>

        )}

      </div>

    </nav>
  );
};

export default Navbar;