const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");
const { HttpError, ctrlWrapper } = require("../../utils");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const result = await User.create({ ...req.body, password: hashPassword });

  const payload = {
    id: result._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(result._id, { token });

  res.status(201).json({
    user: {
      name: result.name,
      email: result.email,
      birthday: result.birthday,
      phone: result.phone,
      skype: result.skype,
      avatarURL: result.avatarURL,
    },
    token,
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
