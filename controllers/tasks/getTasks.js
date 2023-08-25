const { ctrlWrapper } = require("../../utils");
const { Task } = require("../models/task");

const getTasks = async (req, res) => {
  const result = await Task.find({});
  res.json(result);
};

module.exports = {
  getTasks: ctrlWrapper(getTasks),
};
