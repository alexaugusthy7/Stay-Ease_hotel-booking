const ownerMiddleware = (
  req,
  res,
  next
) => {

  if (
    req.user.role !== "hotelOwner"
  ) {

    return res.status(403).json({
      message: "Hotel Owner access only",
    });

  }

  next();
};

export default ownerMiddleware;