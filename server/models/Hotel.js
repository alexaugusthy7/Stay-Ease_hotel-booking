import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
    name: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    pricePerNight: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    amenities: {
      type: [String],
      default: [],
    },

    rating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Hotel = mongoose.model("Hotel", hotelSchema);

export default Hotel;