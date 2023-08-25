const { ctrlWrapper } = require("../../utils");
const { Task } = require("../../models/task");

const postTask = async (req, res) => {
  const { _id: idUser } = req.user;
  const result = await Task.create({ ...req.body, owner: idUser });
  const { _id, title, date, start, end, priority, category, owner } = result;
  res
    .status(201)
    .json({ _id, title, date, start, end, priority, category, owner });
};

module.exports = {
  postTask: ctrlWrapper(postTask),
};
