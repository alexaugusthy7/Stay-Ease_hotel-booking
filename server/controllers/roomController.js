import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

// Get All Rooms
export const getRooms = async (req, res) => {
  try {

    const rooms = await Room.find()
      .populate("hotel")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      rooms,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get Rooms By Hotel
export const getRoomsByHotel = async (req, res) => {
  try {

    const rooms = await Room.find({
      hotel: req.params.hotelId,
    });

    res.status(200).json({
      success: true,
      rooms,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyRooms = async (
  req,
  res
) => {

  try {

    const hotels =
      await Hotel.find({
        owner: req.user.id,
      });

    const hotelIds =
      hotels.map(
        hotel => hotel._id
      );

    const rooms =
      await Room.find({
        hotel: {
          $in: hotelIds,
        },
      }).populate("hotel");

    res.status(200).json({
      success: true,
      rooms,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

export const getRoomById = async (
  req,
  res
) => {

  try {

    const room =
      await Room.findById(
        req.params.id
      );

    if (!room) {

      return res.status(404).json({
        success: false,
        message: "Room not found",
      });

    }

    res.status(200).json(room);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


// Add Room
export const addRoom = async (req, res) => {
  try {

    const {
      hotel,
      roomType,
      pricePerNight,
      capacity,
      amenities,
    } = req.body;

    const hotelData =
      await Hotel.findById(hotel);

    if (!hotelData) {

      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });

    }

    if (
      hotelData.owner.toString() !==
      req.user.id
    ) {

      return res.status(403).json({
        success: false,
        message:
          "You can only add rooms to your own hotels",
      });

    }

    const room = await Room.create({
      hotel,
      roomType,
      pricePerNight,
      capacity,
      amenities:
        typeof amenities === "string"
          ? amenities.split(",")
          : amenities,
      image: req.file
        ? req.file.path
        : "",
    });

    res.status(201).json({
      success: true,
      room,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Update Room
export const updateRoom = async (req, res) => {
  try {

    const room = await Room.findById(
      req.params.id
    ).populate("hotel");

    if (!room) {

      return res.status(404).json({
        success: false,
        message: "Room not found",
      });

    }

    // Check ownership
    if (
      req.user.role !== "admin" &&
      room.hotel.owner.toString() !==
      req.user.id
    ) {

      return res.status(403).json({
        success: false,
        message:
          "You can only update your own rooms",
      });

    }

    room.roomType =
      req.body.roomType ||
      room.roomType;

    room.pricePerNight =
      req.body.pricePerNight ||
      room.pricePerNight;

    room.capacity =
      req.body.capacity ||
      room.capacity;

    room.amenities =
      req.body.amenities
        ? req.body.amenities.split(",")
        : room.amenities;

    if (req.file) {

      room.image =
        req.file.path;

    }

    await room.save();

    res.status(200).json({
      success: true,
      room,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Delete Room
export const deleteRoom = async (req, res) => {
  try {

    const room = await Room.findById(
      req.params.id
    ).populate("hotel");

    if (!room) {

      return res.status(404).json({
        success: false,
        message: "Room not found",
      });

    }

    // Check ownership
    if (
      req.user.role !== "admin" &&
      room.hotel.owner.toString() !==
      req.user.id
    ) {

      return res.status(403).json({
        success: false,
        message:
          "You can only delete your own rooms",
      });

    }

    await Room.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Room deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};