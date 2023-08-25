const { ctrlWrapper } = require("../../utils");
const { Review } = require("../../models/review");
const { HttpError } = require("../../utils");

const patchReview = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Review.findOneAndUpdate({ owner }, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found review");
  }
  res.json(result);
};

module.exports = {
  patchReview: ctrlWrapper(patchReview),
};
