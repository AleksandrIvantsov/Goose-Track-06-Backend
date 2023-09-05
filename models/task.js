const { Schema, model } = require("mongoose");
const Joi = require("joi");

const PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

const CATEGORY = {
  TODO: "to-do",
  INPROGRESS: "in-progress",
  DONE: "done",
};

const dateRegexp = /\d{4}-\d{2}-\d{2}/; // формат дати YYYY-MM-DD
const timeRegexp = /\d{2}:\d{2}/; // формат часу HH:MM

// Валідатор даних на сервері
const taskSchema = new Schema(
  {
    title: {
      type: String,
      minlength: 3,
      maxlength: 250,
      required: [true, "Set a title of task"],
    },
    date: {
      type: String,
      match: dateRegexp,
      required: [true, "Set date of task"],
    },
    start: {
      type: String,
      match: timeRegexp,
      required: [true, "Set time start of task"],
    },
    end: {
      type: String,
      match: timeRegexp,
      required: [true, "Set time end of task"],
      validate: {
        validator: function (value) {
          return value > this.start;
        },
        message: "Start time should be lower than End time!",
      },
    },
    priority: {
      type: String,
      enum: [PRIORITY.LOW, PRIORITY.MEDIUM, PRIORITY.HIGH],
      required: [true, "Set priority of task"],
      default: PRIORITY.LOW,
    },
    category: {
      type: String,
      enum: [CATEGORY.TODO, CATEGORY.INPROGRESS, CATEGORY.DONE],
      required: [true, "Set category of task"],
      default: CATEGORY.TODO,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true, versionKey: false }
);

// Middleware обробки помилки валідації на сервері. Додаємо статус помилки, оскільки MongoDB повертає помилку без статусу
taskSchema.post("save", (error, data, next) => {
  error.status = 400;
  next();
});

const Task = model("task", taskSchema);

// Валідатори отриманих з клієнта даних
const taskValidator = Joi.object({
  title: Joi.string().min(3).max(250).required().empty(false).messages({
    "string.base": "Title must be a string.",
    "any.required": "Title field is required.",
    "string.empty": "Title must not be empty.",
    "string.min": "Title must be not less than 3 characters.",
    "string.max": "Title must be not longer than 250 characters.",
  }),
  date: Joi.string().pattern(dateRegexp).required().empty(false).messages({
    "string.base": "Date must be a string.",
    "any.required": "Date field is required.",
    "string.empty": "Date must not be empty.",
    "string.pattern.base": "Date must be in propper format, ex: 2023-08-25.",
  }),
  start: Joi.string().pattern(timeRegexp).required().empty(false).messages({
    "string.base": "Start time must be a string.",
    "any.required": "Start time field is required.",
    "string.empty": "Start time must not be empty.",
    "string.pattern.base": "Start time must be in propper format, ex: 09:00.",
  }),
  end: Joi.string().pattern(timeRegexp).required().empty(false).messages({
    "string.base": "End time must be a string.",
    "any.required": "End time field is required.",
    "string.empty": "End time must not be empty.",
    "string.pattern.base": "End time must be in propper format, ex: 18:00.",
  }),
  priority: Joi.string()
    .valid(...Object.values(PRIORITY))
    .required()
    .empty(false)
    .messages({
      "string.base": "Priority must be a string.",
      "any.required": "Priority field is required.",
      "string.empty": "Priority must not be empty.",
    }),
  category: Joi.string()
    .valid(...Object.values(CATEGORY))
    .required()
    .empty(false)
    .messages({
      "string.base": "Category must be a string.",
      "any.required": "Category field is required.",
      "string.empty": "Category must not be empty.",
    }),
}).custom((doc, helpers) => {
  if (doc.start > doc.end) {
    throw new Error("Start time should be lower than End time!");
  }
  return doc; // Return the value unchanged
});

const taskUpdateValidator = Joi.object({
  title: Joi.string().min(3).max(250).empty(false).messages({
    "string.base": "Title must be a string.",
    "string.empty": "Title must not be empty.",
    "string.min": "Title must be not less than 3 characters.",
    "string.max": "Title must be not longer than 250 characters.",
  }),
  date: Joi.string().pattern(dateRegexp).empty(false).messages({
    "string.base": "Date must be a string.",
    "string.empty": "Date must not be empty.",
    "string.pattern.base": "Date must be in propper format, ex: 2023-08-25.",
  }),
  start: Joi.string().pattern(timeRegexp).empty(false).messages({
    "string.base": "Start time must be a string.",
    "string.empty": "Start time must not be empty.",
    "string.pattern.base": "Start time must be in propper format, ex: 09:00.",
  }),
  end: Joi.string().pattern(timeRegexp).empty(false).messages({
    "string.base": "End time must be a string.",
    "string.empty": "End time must not be empty.",
    "string.pattern.base": "End time must be in propper format, ex: 18:00.",
  }),
  priority: Joi.string()
    .valid(...Object.values(PRIORITY))
    .empty(false)
    .messages({
      "string.base": "Priority must be a string.",
      "string.empty": "Priority must not be empty.",
    }),
  category: Joi.string()
    .valid(...Object.values(CATEGORY))
    .empty(false)
    .messages({
      "string.base": "Category must be a string.",
      "string.empty": "Category must not be empty.",
    }),
});

const schemas = { taskValidator, taskUpdateValidator };

module.exports = { schemas, Task };
