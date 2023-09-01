const { ctrlWrapper } = require("../../utils");
const { Task } = require("../../models/task");
const { HttpError } = require("../../utils");

const patchTask = async (req, res) => {
  const { id } = req.params;
  const { _id: ownerId } = req.user;

  const result = await Task.findOneAndUpdate(
    { _id: id, owner: ownerId },
    req.body,
    {
      new: true,
    }
  );
  if (!result) {
    throw HttpError(404, "Not found task");
  }
  const { _id, title, date, start, end, priority, category, owner } = result;
  res.json({ _id, title, date, start, end, priority, category, owner });
};

module.exports = {
  patchTask: ctrlWrapper(patchTask),
};
