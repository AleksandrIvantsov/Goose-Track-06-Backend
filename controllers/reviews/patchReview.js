const { ctrlWrapper } = require("../../utils");
const { Review } = require("../../models/review");
const { HttpError } = require("../../utils");

const patchReview = async (req, res) => {
  const { _id: userId } = req.user;

  const result = await Review.findOneAndUpdate({ owner: userId }, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found review");
  }
  const { comment, rating, owner } = result;
  res.json({ comment, rating, owner });
};

module.exports = {
  patchReview: ctrlWrapper(patchReview),
};
