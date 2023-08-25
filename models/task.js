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
const timeRegexp = /\d{2}:\d{2}/; // формат часу HH-MM

// Валідатор даних на сервері
const taskSchema = new Schema(
  {
    title: {
      type: String,
      min: 3,
      max: 250,
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
      required: [true, "Set time start of task"],
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
  title: Joi.string().min(3).max(250).required(),
  date: Joi.string().pattern(dateRegexp).required(),
  start: Joi.string().pattern(timeRegexp).required(),
  end: Joi.string().pattern(timeRegexp).required(),
  priority: Joi.string()
    .valid(...Object.values(PRIORITY))
    .required(),
  category: Joi.string()
    .valid(...Object.values(CATEGORY))
    .required(),
}).custom((doc, helpers) => {
  if (doc.start > doc.end) {
    throw new Error("Start time should be lower than End time!");
  }
  return doc; // Return the value unchanged
});

const taskUpdateValidator = Joi.object({
  title: Joi.string().min(3).max(250),
  date: Joi.string().pattern(dateRegexp),
  start: Joi.string().pattern(timeRegexp),
  end: Joi.string().pattern(timeRegexp),
  priority: Joi.string().valid(...Object.values(PRIORITY)),
  category: Joi.string().valid(...Object.values(CATEGORY)),
});

const schemas = { taskValidator, taskUpdateValidator };

module.exports = { schemas, Task };
