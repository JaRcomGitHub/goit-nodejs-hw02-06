const bcrypt = require("bcrypt");
const { User } = require("../../schemas/user");
const { schemaAuth } = require("../../schemas/validation");
const gravatar = require("gravatar");
const sendGrid = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;

async function signup(req, res, next) {
  const { email, password } = req.body;

  const validationResult = schemaAuth.validate({ email, password });
  if (validationResult.error) {
    return res.status(400).json({ message: validationResult.error.message });
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const avatarURL = gravatar.url(email, { s: "200", r: "g", d: "identicon" });

  try {
    const savedUser = await User.create({
      email,
      password: hashedPassword,
      avatarURL,
    });
    console.log("signupUser", savedUser);

    sendGrid.setApiKey(SENDGRID_API_KEY);

    const sendEmail = {
      from: "jarcom@ukr.net",
      to: "jarcom@ukr.net",
      subject: "Verified email 1",
      html: "<h1> Hello there! </h1>", //
      text: "Hello there!",
    };

    const response = await sendGrid.send(sendEmail);
    console.log(response);

    return res.status(201).json({
      user: {
        email,
        subscription: "starter",
      },
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      return res.status(409).json({ message: "Email in use" });
    }
    return res.status(500).json({ message: error.message }); // throw error;
  }
}

module.exports = signup;
