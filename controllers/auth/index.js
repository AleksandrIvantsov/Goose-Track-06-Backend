const { register } = require("./register");
const { login } = require("./login");
const { getCurrent } = require("./getCurrent");
const { logout } = require("./logout");
const { patchUser } = require("./patchUser");

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  patchUser,
};
