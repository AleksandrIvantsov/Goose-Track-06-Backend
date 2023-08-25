const { ctrlWrapper } = require("../../utils");
const { Review } = require("../../models/review");
const { HttpError } = require("../../utils");

const postReview = async (req, res) => {
  const { _id: owner } = req.user;

  // Перевірка існування відгука користувача
  const review = await Review.findOne({ owner });
  if (review) {
    throw HttpError(409, "This user sent own review earlier");
  }
  const result = await Review.create({ ...req.body, owner });
  res.status(201).json(result);
};

module.exports = {
  postReview: ctrlWrapper(postReview),
};
