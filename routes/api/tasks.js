const express = require("express");

const router = express.Router();

const {
  getTasks,
  getTaskById,
  deleteTask,
  postTask,
  putTask,
} = require("../../controllers");

const { schemas } = require("../../models/task");
const { authenticate, isValidId, validateBody } = require("../../middlewares");

router.use(authenticate);

router.get("/", getTasks);

router.get("/:id", isValidId, getTaskById);

router.post("/", validateBody(schemas.taskValidator), postTask);

router.delete("/:id", isValidId, deleteTask);

router.patch(
  "/:id",
  isValidId,
  validateBody(schemas.taskValidator, "missing required fields"),
  patchTask
);

module.exports = router;
