const express = require("express");

const {
  register,
  login,
  getCurrent,
  logout,
  patchUser,
} = require("../../controllers/auth");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), register);

router.post("/login", validateBody(schemas.loginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch(
  "/edit",
  authenticate,
  upload.single("avatar"),
  validateBody(schemas.updateSchema),
  patchUser
);

module.exports = router;
