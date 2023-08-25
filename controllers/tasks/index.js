const { getTasks } = require("./getTasks");
const { postTask } = require("./postTask");
const { deleteTask } = require("./deleteTask");
const { patchTask } = require("./patchTask");

module.exports = {
  getTasks,
  postTask,
  deleteTask,
  patchTask,
};
