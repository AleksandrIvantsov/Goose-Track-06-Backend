const { ctrlWrapper } = require("../../utils");

const getCurrent = async (req, res) => {
  const { name, email, birthday, phone, skype, avatarURL } = req.user;

  res.status(200).json({
    name,
    email,
    birthday,
    phone,
    skype,
    avatarURL,
  });
};

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
};
