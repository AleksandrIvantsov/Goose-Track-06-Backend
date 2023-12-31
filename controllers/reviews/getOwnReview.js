const { ctrlWrapper } = require("../../utils");
const { Review } = require("../../models/review");

const getOwnReview = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Review.findOne({ owner }, "-_id -createdAt -updatedAt");
  res.json(result);
};

module.exports = {
  getOwnReview: ctrlWrapper(getOwnReview),
};
