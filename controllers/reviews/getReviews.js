const { ctrlWrapper } = require("../../utils");
const { Review } = require("../../models/review");

const getReviews = async (req, res) => {
  const result = await Review.find().populate("owner", "name avatarURL");
  res.json(result);
};

module.exports = {
  getReviews: ctrlWrapper(getReviews),
};
