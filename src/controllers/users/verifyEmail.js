const { User } = require("../../schemas/user");

async function verifyEmail(req, res, next) {
  const verificationToken = req.params.verificationToken;
  console.log(verificationToken);

  const user = await User.findOne({
    verificationToken,
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    //verificationToken in schema is required
  });

  return res.status(200).json({ message: "Verification successful" });
}

module.exports = verifyEmail;
