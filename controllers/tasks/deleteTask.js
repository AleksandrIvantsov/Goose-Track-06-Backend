const { ctrlWrapper } = require("../../utils");
const { Task } = require("../../models/task");
const { HttpError } = require("../../utils");

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const result = await Task.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Task not found");
  }
  res.json({ message: "Task deleted" });
};

module.exports = {
  deleteTask: ctrlWrapper(deleteTask),
};
