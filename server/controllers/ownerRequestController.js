import OwnerRequest from "../models/OwnerRequest.js";
import User from "../models/User.js";

// Create Owner Request
export const createRequest = async (req, res) => {

  try {

    const existingRequest =
      await OwnerRequest.findOne({
        user: req.user.id,
      });

    if (existingRequest) {

      return res.status(400).json({
        message: "Request already submitted",
      });

    }

    const request =
      await OwnerRequest.create({

        user: req.user.id,

        hotelName:
          req.body.hotelName,

        location:
          req.body.location,

        rooms:
          req.body.rooms,

        phone:
          req.body.phone,

        message:
          req.body.message,

        status: "pending",

      });

    res.status(201).json({
      message: "Request submitted successfully",
      request,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

// Get All Requests
export const getAllRequests = async (
  req,
  res
) => {

  try {

    const requests =
      await OwnerRequest.find()
        .populate("user");

    res.status(200).json(requests);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

// Approve Request
export const approveRequest = async (
  req,
  res
) => {

  try {

    const request =
      await OwnerRequest.findById(
        req.params.id
      );

    if (!request) {

      return res.status(404).json({
        message: "Request not found",
      });

    }

    await User.findByIdAndUpdate(
      request.user,
      {
        role: "hotelOwner",
      }
    );

    request.status = "approved";

    await request.save();

    res.status(200).json({
      message:
        "Owner request approved successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

};