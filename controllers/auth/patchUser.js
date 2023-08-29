const { HttpError, ctrlWrapper } = require("../../utils");
const { User } = require("../../models/user");

const patchUser = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  if (req.file?.path) {
    req.body = {
      ...req.body,
      avatarURL: req.file.path,
    };
  }

  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  const { name, email, birthday, phone, skype, avatarURL } = result;
  res.json({ name, email, birthday, phone, skype, avatarURL });
};

module.exports = {
  patchUser: ctrlWrapper(patchUser),
};
