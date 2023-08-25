const { Schema, model } = require("mongoose");
const Joi = require("joi");

const ratings = ["1", "2", "3", "4", "5"];

// Валідатор даних на сервері
const reviewSchema = new Schema(
  {
    review: {
      type: String,
      minlength: 3,
      maxlength: 300,
      required: [true, "Please, type text of review"],
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
  review: Joi.string().min(3).max(300).required(),
  rating: Joi.string()
    .valid(...ratings)
    .required(),
});

const reviewUpdateValidator = Joi.object({
  review: Joi.string().min(3).max(300),
  rating: Joi.string().valid(...ratings),
});

const schemas = { reviewValidator, reviewUpdateValidator };

module.exports = { schemas, Review };
