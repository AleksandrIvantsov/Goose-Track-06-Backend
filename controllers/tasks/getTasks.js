const { ctrlWrapper } = require("../../utils");
const { Task } = require("../../models/task");

const getTasks = async (req, res) => {
  const month = req.query.choosedDay.slice(0, 7);
  const { _id: owner } = req.user;
  const result = await Task.find({
    owner,
    date: { $regex: month, $options: "i" },
  });
  res.json(result);
};

module.exports = {
  getTasks: ctrlWrapper(getTasks),
};
