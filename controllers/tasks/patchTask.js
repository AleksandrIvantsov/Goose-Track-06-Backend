const { ctrlWrapper } = require("../../utils");
const { Task } = require("../../models/task");
const { HttpError } = require("../../utils");

const patchTask = async (req, res) => {
  const { id } = req.params;

  const result = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found task");
  }
  res.json(result);
};

module.exports = {
  patchTask: ctrlWrapper(patchTask),
};
