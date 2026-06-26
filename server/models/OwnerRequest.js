import mongoose from "mongoose";

const ownerRequestSchema =
  new mongoose.Schema({

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    hotelName: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    rooms: {
      type: Number,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "pending",
    },

  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "OwnerRequest",
  ownerRequestSchema
);