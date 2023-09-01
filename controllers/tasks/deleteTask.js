const { ctrlWrapper } = require("../../utils");
const { Task } = require("../../models/task");
const { HttpError } = require("../../utils");

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const { _id: ownerId } = req.user;

  const result = await Task.findOneAndRemove({ _id: id, owner: ownerId });
  if (!result) {
    throw HttpError(404, "Task not found");
  }
  res.status(204).json({ message: "Task deleted" });
};

module.exports = {
  deleteTask: ctrlWrapper(deleteTask),
};
