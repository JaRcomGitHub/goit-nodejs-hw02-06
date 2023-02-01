const { User } = require("../../schemas/user");

async function verifyEmail(req, res, next) {
  const verificationToken = req.params.verificationToken;

  const user = await User.findOne({
    verificationToken,
  });

  if (!user || user?.verify) {
    return res.status(404).json({ message: "User not found" });
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  return res.status(200).json({ message: "Verification successful" });
}

module.exports = verifyEmail;
