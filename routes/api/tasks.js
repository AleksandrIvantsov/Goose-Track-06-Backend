const express = require("express");

const router = express.Router();

const {
  getTasks,
  postTask,
  deleteTask,
  patchTask,
} = require("../../controllers/tasks");

const { schemas } = require("../../models/task");
const { authenticate, isValidId, validateBody } = require("../../middlewares");

router.use(authenticate);

router.get("/", getTasks);

router.post("/", validateBody(schemas.taskValidator), postTask);

router.delete("/:id", isValidId, deleteTask);

router.patch(
  "/:id",
  isValidId,
  validateBody(schemas.taskUpdateValidator, "mistakes in fields"),
  patchTask
);

module.exports = router;
