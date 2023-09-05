const { Schema, model } = require("mongoose");
const Joi = require("joi");

const handleMongooseError = require("../utils/handleMongooseError");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const birthdayRegexp = /^\d{4}-\d{2}-\d{2}$/;
const phoneRegexp = /^\+380\d{2}\d{3}\d{2}\d{2}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 16,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    token: {
      type: String,
      default: null,
    },
    birthday: {
      type: String,
      match: birthdayRegexp,
      default: null,
    },
    phone: {
      type: String,
      match: phoneRegexp,
      default: null,
    },
    skype: {
      type: String,
      minlength: 2,
      maxlength: 16,
      default: null,
    },
    avatarURL: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(16).required().empty(false).messages({
    "string.base": "Name must be a string.",
    "any.required": "Name field is required.",
    "string.empty": "Name must not be empty.",
    "string.min": "Name must be not less than 2 characters.",
    "string.max": "Name must be not longer than 16 characters.",
  }),
  email: Joi.string().pattern(emailRegexp).required().empty(false).messages({
    "string.base": "Email must be a string.",
    "any.required": "Email field is required.",
    "string.empty": "Email must not be empty.",
    "string.pattern.base":
      "Email must be in propper format, ex: user@domain.com.",
  }),
  password: Joi.string().min(6).required().empty(false).messages({
    "string.base": "The password must be a string.",
    "any.required": "The password field is required.",
    "string.empty": "The password must not be empty.",
    "string.min": "The password must be not less than 6 characters.",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().empty(false).messages({
    "string.base": "Email must be a string.",
    "any.required": "Email field is required.",
    "string.empty": "Email must not be empty.",
    "string.pattern.base":
      "Email must be in propper format, ex: user@domain.com.",
  }),
  password: Joi.string().min(6).required().empty(false).messages({
    "string.base": "The password must be a string.",
    "any.required": "The password field is required.",
    "string.empty": "The password must not be empty.",
    "string.min": "The password must be not less than 6 characters.",
  }),
});

const updateSchema = Joi.object({
  name: Joi.string().min(2).max(16).empty(false).messages({
    "string.base": "Name must be a string.",
    "string.empty": "Name must not be empty.",
    "string.min": "Name must be not less than 2 characters.",
    "string.max": "Name must be not longer than 16 characters.",
  }),
  email: Joi.string().pattern(emailRegexp).empty(false).messages({
    "string.base": "Email must be a string.",
    "string.empty": "Email must not be empty.",
    "string.pattern.base":
      "Email must be in propper format, ex: user@domain.com.",
  }),
  birthday: Joi.string().pattern(birthdayRegexp).empty(false).messages({
    "string.base": "Birthday must be a string.",
    "string.empty": "Birthday must not be empty.",
    "string.pattern.base":
      "Birthday must be in propper format, ex: 1995-08-25.",
  }),
  phone: Joi.string().pattern(phoneRegexp).empty(false).messages({
    "string.base": "Phone must be a string.",
    "string.empty": "Phone must not be empty.",
    "string.pattern.base":
      "Phone must be in propper format, ex: +380963741177.",
  }),
  skype: Joi.string().min(2).max(16).empty(false).messages({
    "string.base": "Skype must be a string.",
    "string.empty": "Skype must not be empty.",
    "string.min": "Skype must be not less than 2 characters.",
    "string.max": "Skype must be not longer than 16 characters.",
  }),
});

const schemas = {
  registerSchema,
  loginSchema,
  updateSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
