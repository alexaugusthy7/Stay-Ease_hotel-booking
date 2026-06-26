import User from "../models/User.js";
import Hotel from "../models/Hotel.js";

export const getAllUsers = async (
  req,
  res
) => {

  try {

    const users =
      await User.find()
        .select("-password");

    const owners =
      await User.find({
        role: "hotelOwner",
      }).select("-password");

    const ownersWithHotels =
      await Promise.all(
        owners.map(
          async (owner) => {

            const hotels =
              await Hotel.find({
                owner: owner._id,
              });

            return {
              ...owner.toObject(),
              hotels,
            };

          }
        )
      );

    res.status(200).json({
      users,
      owners:
        ownersWithHotels,
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

export const deleteUser = async (
  req,
  res
) => {

  await User.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message: "User deleted",
  });

};

export const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.isBlocked = !user.isBlocked;

    await user.save();

    res.status(200).json({
      message: "Status updated",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};