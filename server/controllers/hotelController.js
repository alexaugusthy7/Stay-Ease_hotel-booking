import Hotel from "../models/Hotel.js";


// Add Hotel
export const addHotel = async (req, res) => {
  try {

    const {
      name,
      city,
      address,
      description,
      pricePerNight,
      amenities,
      rating,
    } = req.body;

    const image = req.file
      ? req.file.path
      : "";

    const hotel = await Hotel.create({
      name,
      city,
      address,
      description,
      pricePerNight,

      amenities:
        typeof amenities === "string"
          ? amenities.split(",")
          : amenities,

      rating,
      image,
    });

    res.status(201).json({
      message: "Hotel added successfully",
      hotel,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};



// Get All Hotels
export const getHotels = async (req, res) => {

  try {

    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 10;

    const skip =
      (page - 1) * limit;

    const {
      city,
      minPrice,
      maxPrice,
    } = req.query;

    let query = {};

    // City Filter
    if (city) {

      query.city = {
        $regex: city,
        $options: "i",
      };
    }

    // Price Filter
    if (minPrice && maxPrice) {

      query.pricePerNight = {
        $gte: Number(minPrice),
        $lte: Number(maxPrice),
      };
    }

    const hotels =
      await Hotel.find(query)
        .skip(skip)
        .limit(limit);

    const totalHotels =
      await Hotel.countDocuments(query);

    res.status(200).json({
      totalHotels,
      currentPage: page,
      totalPages: Math.ceil(
        totalHotels / limit
      ),
      hotels,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};



// Update Hotel
export const updateHotel = async (
  req,
  res
) => {

  try {

    const hotel =
      await Hotel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!hotel) {

      return res.status(404).json({
        message: "Hotel not found",
      });
    }

    res.status(200).json({
      message:
        "Hotel updated successfully",
      hotel,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};



// Delete Hotel
export const deleteHotel = async (
  req,
  res
) => {

  try {

    const hotel =
      await Hotel.findByIdAndDelete(
        req.params.id
      );

    if (!hotel) {

      return res.status(404).json({
        message: "Hotel not found",
      });
    }

    res.status(200).json({
      message:
        "Hotel deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};



// Get Hotel By ID
export const getHotelById = async (
  req,
  res
) => {

  try {

    const hotel =
      await Hotel.findById(
        req.params.id
      );

    if (!hotel) {

      return res.status(404).json({
        message: "Hotel not found",
      });
    }

    res.status(200).json(hotel);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};