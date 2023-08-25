const { ctrlWrapper } = require("../../utils");
const { Review } = require("../../models/review");
const { HttpError } = require("../../utils");

const deleteReview = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Review.findOneAndDelete({ owner });

  if (!result) {
    throw HttpError(404, "Review not found");
  }
  res.json({ message: "Review deleted" });
};

module.exports = {
  deleteReview: ctrlWrapper(deleteReview),
};
