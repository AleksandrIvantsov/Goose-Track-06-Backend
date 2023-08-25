const express = require("express");

const router = express.Router();

const {
  getReviews,
  getOwnReview,
  postReview,
  deleteReview,
  patchReview,
} = require("../../controllers/reviews");

const { schemas } = require("../../models/review");
const { authenticate, validateBody } = require("../../middlewares");

router.get("/", getReviews);

router.get("/own", authenticate, getOwnReview);

router.post(
  "/own",
  validateBody(schemas.reviewValidator),
  authenticate,
  postReview
);

router.delete("/own", authenticate, deleteReview);

router.patch(
  "/own",
  validateBody(schemas.reviewUpdateValidator, "mistakes in fields"),
  authenticate,
  patchReview
);

module.exports = router;
