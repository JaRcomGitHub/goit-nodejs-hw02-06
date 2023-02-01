const { User } = require("../../schemas/user");

async function resendEmail(req, res, next) {
  const { email } = req.body;

  return res.status(200).json({ message: "test" });
}

module.exports = resendEmail;
