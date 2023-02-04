const sendGrid = require("@sendgrid/mail");

const { PORT } = process.env;
const { SENDGRID_API_KEY } = process.env;

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

async function sendEmail(email, verificationToken) {
  sendGrid.setApiKey(SENDGRID_API_KEY);
  const response = await sendGrid.send(createEmail(email, verificationToken));
  // console.log(response);
}

module.exports = sendEmail;
