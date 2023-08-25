const { getReviews } = require("./getReviews");
const { getOwnReview } = require("./getOwnReview");
const { postReview } = require("./postReview");
const { deleteReview } = require("./deleteReview");
const { patchReview } = require("./patchReview");

module.exports = {
  getReviews,
  getOwnReview,
  postReview,
  deleteReview,
  patchReview,
};
