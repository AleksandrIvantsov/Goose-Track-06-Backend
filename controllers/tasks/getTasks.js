const { ctrlWrapper } = require("../../utils");
const { Task } = require("../../models/task");

const getTasks = async (req, res) => {
  const { choosedMonth } = req.query;
  const { _id: owner } = req.user;
  const result = await Task.find(
    {
      owner,
      date: { $regex: choosedMonth, $options: "i" },
    },
    "-createdAt -updatedAt"
  );
  res.json(result);
};

module.exports = {
  getTasks: ctrlWrapper(getTasks),
};
