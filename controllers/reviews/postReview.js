const { ctrlWrapper } = require("../../utils");
const { Review } = require("../../models/review");
const { HttpError } = require("../../utils");

const postReview = async (req, res) => {
  const { _id: userId } = req.user;

  // Перевірка існування відгука користувача
  const review = await Review.findOne({ owner: userId });
  if (review) {
    throw HttpError(409, "This user sent own review earlier");
  }
  const result = await Review.create({ ...req.body, owner: userId });
  const { comment, rating, owner } = result;
  res.status(201).json({ comment, rating, owner });
};

module.exports = {
  postReview: ctrlWrapper(postReview),
};
