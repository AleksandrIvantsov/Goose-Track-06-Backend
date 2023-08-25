const { ctrlWrapper } = require("../../utils");
const { Review } = require("../../models/review");

const postReview = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Review.create({ ...req.body, owner });
  res.status(201).json(result);
};

module.exports = {
  postReview: ctrlWrapper(postReview),
};
