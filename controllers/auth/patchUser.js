const { ctrlWrapper } = require("../../utils");
const { User } = require("../../models/user");

const patchUser = async (req, res) => {
  const { _id } = req.user;
  req.body = {
    ...req.body,
    avatarURL: req.file.path,
  };

  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  const { name, email, birthday, phone, skype, avatarURL } = result;
  res.json({ name, email, birthday, phone, skype, avatarURL });
};

module.exports = {
  patchUser: ctrlWrapper(patchUser),
};
