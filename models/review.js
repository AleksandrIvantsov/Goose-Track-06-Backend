const { Schema, model } = require("mongoose");
const Joi = require("joi");

const ratings = ["1", "2", "3", "4", "5"];

// Валідатор даних на сервері
const reviewSchema = new Schema(
  {
    comment: {
      type: String,
      minlength: 3,
      maxlength: 300,
      required: [true, "Please, type comment of review"],
    },

    rating: {
      type: String,
      enum: ratings,
      required: [true, "Set rating of review"],
      default: "3",
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true, versionKey: false }
);

// Middleware обробки помилки валідації на сервері. Додаємо статус помилки, оскільки MongoDB повертає помилку без статусу
reviewSchema.post("save", (error, data, next) => {
  error.status = 400;
  next();
});

const Review = model("review", reviewSchema);

// Валідатори отриманих з клієнта даних
const reviewValidator = Joi.object({
  comment: Joi.string().min(3).max(300).required().empty(false).messages({
    "string.base": "Review must be a string.",
    "any.required": "Review field is required.",
    "string.empty": "Review must not be empty.",
    "string.min": "Review must be not less than 3 characters.",
    "string.max": "Review must be not longer than 300 characters.",
  }),
  rating: Joi.string()
    .valid(...ratings)
    .required()
    .empty(false)
    .messages({
      "string.base": "Rating must be a string.",
      "any.required": "Rating field is required.",
      "string.empty": "Rating must not be empty.",
    }),
});

const reviewUpdateValidator = Joi.object({
  comment: Joi.string().min(3).max(300).empty(false).messages({
    "string.base": "Review must be a string.",
    "string.empty": "Review must not be empty.",
    "string.min": "Review must be not less than 3 characters.",
    "string.max": "Review must be not longer than 300 characters.",
  }),
  rating: Joi.string()
    .valid(...ratings)
    .empty(false)
    .messages({
      "string.base": "Rating must be a string.",
      "string.empty": "Rating must not be empty.",
    }),
});

const schemas = { reviewValidator, reviewUpdateValidator };

module.exports = { schemas, Review };
