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
  name: Joi.string().min(2).max(16).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const updateSchema = Joi.object({
  name: Joi.string().min(2).max(16),
  email: Joi.string().pattern(emailRegexp),
  birthday: Joi.string().pattern(birthdayRegexp),
  phone: Joi.string().pattern(phoneRegexp),
  skype: Joi.string().min(2).max(16),
});

const schemas = {
  registerSchema,
  loginSchema,
  updateSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
