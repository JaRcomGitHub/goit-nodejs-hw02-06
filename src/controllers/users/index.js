const signup = require("./signup");
const login = require("./login");
const logout = require("./logout");
const current = require("./current");
const subscription = require("./subscription");
const avatars = require("./avatars");
const verifyEmail = require("./verifyEmail");
const resendEmail = require("./resendEmail");

module.exports = {
  signup,
  login,
  logout,
  current,
  subscription,
  avatars,
  verifyEmail,
  resendEmail,
};
