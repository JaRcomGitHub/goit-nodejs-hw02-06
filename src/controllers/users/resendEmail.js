const { User } = require("../../schemas/user");
const { schemaEmail } = require("../../schemas/validation");
const { v4 } = require("uuid");
const sendEmail = require("../../servises/email");

async function resendEmail(req, res, next) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "missing required field email" });
  }

  const validationResult = schemaEmail.validate({ email });
  if (validationResult.error) {
    return res.status(400).json({ message: validationResult.error.message });
  }

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user?.verify) {
    return res
      .status(400)
      .json({ message: "Verification has already been passed" });
  }

  const verificationToken = v4();

  await User.findByIdAndUpdate(user._id, {
    verificationToken,
  });

  try {
    sendEmail(email, verificationToken);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  return res.status(200).json({ message: "test resendEmail" });
}

module.exports = resendEmail;
