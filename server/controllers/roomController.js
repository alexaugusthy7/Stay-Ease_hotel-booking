import Room from "../models/Room.js";


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

    const room =
      await Room.findById(req.params.id);

    if (!room) {

      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    room.hotel =
      req.body.hotel || room.hotel;

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
      room.image = req.file.path;
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

    const room =
      await Room.findById(req.params.id);

    if (!room) {

      return res.status(404).json({
        success: false,
        message: "Room not found",
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