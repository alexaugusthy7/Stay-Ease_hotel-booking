import { useState } from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import api from "../services/api";

import { useAuth } from "../context/AuthContext";

import toast from "react-hot-toast";

const BookingPage = () => {

  const { roomId } = useParams();

  const navigate = useNavigate();

  const { token, user } = useAuth();

  // Booking States
  const [checkInDate, setCheckInDate] =
    useState("");

  const [checkOutDate, setCheckOutDate] =
    useState("");

  const [fullName, setFullName] =
    useState(user?.username || "");

  const [email, setEmail] =
    useState(user?.email || "");

  const [phone, setPhone] =
    useState("");

  const [guests, setGuests] =
    useState(1);

  const [specialRequests, setSpecialRequests] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // Payment Method
  const [paymentMethod, setPaymentMethod] =
    useState("online");

  // OTP States
  const [otp, setOtp] =
    useState("");

  const [otpSent, setOtpSent] =
    useState(false);

  const [otpVerified, setOtpVerified] =
    useState(false);

  // Send OTP
  const sendOTP = async () => {

    if (!email) {

      return toast.error(
        "Enter email first"
      );
    }

    try {

      await api.post(
        "/otp/send",
        { email }
      );

      toast.success(
        "OTP Sent To Email"
      );

      setOtpSent(true);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to send OTP"
      );
    }
  };

  // Verify OTP
  const verifyOTP = async () => {

    if (!otp) {

      return toast.error(
        "Enter OTP"
      );
    }

    try {

      await api.post(
        "/otp/verify",
        {
          email,
          otp,
        }
      );

      toast.success(
        "OTP Verified"
      );

      setOtpVerified(true);

    } catch (error) {

      console.log(error);

      toast.error(
        "Invalid OTP"
      );
    }
  };

  // Handle Booking
  const handleBooking = async () => {

    if (
      !fullName ||
      !email ||
      !phone ||
      !checkInDate ||
      !checkOutDate
    ) {

      return toast.error(
        "Please fill all required fields"
      );
    }

    // OTP Check
    if (!otpVerified) {

      return toast.error(
        "Please verify OTP first"
      );
    }

    try {

      setLoading(true);

      // Create Booking
      const bookingResponse =
        await api.post(
          "/bookings",
          {
            room: roomId,

            checkInDate,

            checkOutDate,

            guestName: fullName,

            email,

            phone,

            guests,

            specialRequests,

            paymentMethod,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const booking =
        bookingResponse.data.booking;

      // PAY LATER
      if (
        paymentMethod === "payLater"
      ) {

        toast.success(
          "Booking Confirmed - Pay At Hotel"
        );

        navigate("/bookings");

        return;
      }

      // ONLINE PAYMENT
      const paymentResponse =
        await api.post(
          "/payments/create-order",
          {
            amount:
              booking.totalPrice,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const order =
        paymentResponse.data;

      // Razorpay Options
      const options = {

        key:
          import.meta.env
            .VITE_RAZORPAY_KEY_ID,

        amount:
          order.amount,

        currency:
          order.currency,

        name:
          "StayEase",

        description:
          "Hotel Room Booking",

        order_id:
          order.id,

        handler:
          async function (response) {

            try {

              await api.post(
                "/payments/verify-payment",
                {
                  razorpay_order_id:
                    response.razorpay_order_id,

                  razorpay_payment_id:
                    response.razorpay_payment_id,

                  razorpay_signature:
                    response.razorpay_signature,

                  bookingId:
                    booking._id,
                },
                {
                  headers: {
                    Authorization:
                      `Bearer ${token}`,
                  },
                }
              );

              toast.success(
                "Payment Successful"
              );

              navigate("/bookings");

            } catch (error) {

              console.log(error);

              toast.error(
                "Payment Verification Failed"
              );
            }
          },

        prefill: {
          name: fullName,
          email,
          contact: phone,
        },

        theme: {
          color: "#000000",
        },
      };

      // Open Razorpay
      const razorpay =
        new window.Razorpay(options);

      razorpay.open();

    } catch (error) {

      console.log(error);

      toast.error(
        error?.response?.data?.message ||
        "Booking Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <MainLayout>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg mt-10 mb-10">

        <h1 className="text-4xl font-bold mb-8">
          Complete Your Booking
        </h1>

        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) =>
            setFullName(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-4"
        />

        {/* Email */}
        <div className="flex gap-2 mb-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border p-3 rounded-lg"
          />

          <button
            onClick={sendOTP}
            className="bg-black text-white px-4 rounded-lg"
          >
            Send OTP
          </button>

        </div>

        {/* OTP */}
        {otpSent && (

          <div className="flex gap-2 mb-4">

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value)
              }
              className="w-full border p-3 rounded-lg"
            />

            <button
              onClick={verifyOTP}
              className="bg-green-600 text-white px-4 rounded-lg"
            >
              Verify
            </button>

          </div>

        )}

        {/* Verified */}
        {otpVerified && (

          <p className="text-green-600 mb-4">
            Email Verified Successfully
          </p>

        )}

        {/* Phone */}
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-4"
        />

        {/* Guests */}
        <input
          type="number"
          placeholder="Guests"
          value={guests}
          onChange={(e) =>
            setGuests(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-4"
        />

        {/* Dates */}
        <input
          type="date"
          value={checkInDate}
          onChange={(e) =>
            setCheckInDate(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="date"
          value={checkOutDate}
          onChange={(e) =>
            setCheckOutDate(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-4"
        />

        {/* Special Requests */}
        <textarea
          rows="4"
          placeholder="Special Requests"
          value={specialRequests}
          onChange={(e) =>
            setSpecialRequests(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-lg mb-6"
        />

        {/* Payment Method */}
        <div className="mb-6">

          <h2 className="text-2xl font-semibold mb-4">
            Select Payment Method
          </h2>

          <div className="flex flex-col gap-4">

            <label className="border p-4 rounded-xl flex items-center gap-3 cursor-pointer">

              <input
                type="radio"
                name="paymentMethod"
                value="online"
                checked={
                  paymentMethod === "online"
                }
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value
                  )
                }
              />

              <div>
                <h3 className="font-bold">
                  Pay Now
                </h3>
              </div>

            </label>

            <label className="border p-4 rounded-xl flex items-center gap-3 cursor-pointer">

              <input
                type="radio"
                name="paymentMethod"
                value="payLater"
                checked={
                  paymentMethod === "payLater"
                }
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value
                  )
                }
              />

              <div>
                <h3 className="font-bold">
                  Pay Later
                </h3>
              </div>

            </label>

          </div>

        </div>

        {/* Booking Button */}
        <button
          onClick={handleBooking}
          disabled={loading}
          className="w-full bg-black text-white py-4 rounded-xl"
        >
          {
            loading
              ? "Processing..."
              : paymentMethod ===
                "payLater"
              ? "Confirm Booking"
              : "Proceed To Payment"
          }
        </button>

      </div>

    </MainLayout>
  );
};

export default BookingPage;