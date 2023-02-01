const { PORT } = process.env;

function createEmail(email, verificationToken) {
  const confirmLink = `www.localhost:${PORT}/users/verify/${verificationToken}`;
  const sendEmail = {
    from: "jarcom@ukr.net",
    to: email,
    subject: "Please confirm your email",
    html: `<a href="http://${confirmLink}">Confirm your email</a>
        <p>go to link ${confirmLink}</p>`,
    text: `go to link ${confirmLink}`,
  };
  return sendEmail;
}

module.exports = createEmail;
