import Review from "../models/Review.js";

export const addReview = async (req, res) => {
  try {

    console.log("Review Data:", req.body);

    const { name, rating, comment } = req.body;

    const review = await Review.create({
      name,
      rating,
      comment,
    });

    console.log("Saved Review:", review);

    res.status(201).json(review);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const getReviews = async (req, res) => {
  try {

    const reviews = await Review.find()
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};