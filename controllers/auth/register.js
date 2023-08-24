const bcrypt = require("bcrypt");

const { User } = require("../../models/user");
const { HttpError, ctrlWrapper } = require("../../utils");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const result = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    user: {
      name: result.name,
      email: result.email,
    },
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
