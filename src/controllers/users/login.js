const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../schemas/user");
const { schemaAuth } = require("../../schemas/validation");

const { JWT_SECRET } = process.env;

async function login(req, res, next) {
  const { email, password } = req.body;

  const validationResult = schemaAuth.validate({ email, password });
  if (validationResult.error) {
    return res.status(400).json({ message: validationResult.error.message });
  }

  const storedUser = await User.findOne({ email });
  if (!storedUser) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  if (!storedUser.verify) {
    return res
      .status(401)
      .json({ message: "email is not verified! Please check your mail box" });
  }

  const isPasswordValid = await bcrypt.compare(password, storedUser.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  const { id, subscription } = storedUser;
  const payload = { id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

  try {
    await User.findByIdAndUpdate(storedUser._id, {
      token,
    });
    console.log("loginUser", storedUser);

    return res.status(200).json({
      token,
      user: {
        email,
        subscription,
      },
    });
  } catch (error) {
    console.log("error", error.message);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = login;
