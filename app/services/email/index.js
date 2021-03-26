const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASSWORD,
  },
});

async function mailer(body) {
  const mailOptions = {
    from: `"Effective Soft" <${process.env.MAIL}>`,
    to: `${body.email}`,
    subject: 'Hello from EffectiveSoft Internship',
    text: `Hello ${body.name}, this message was sent from the server of the internship project`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = mailer;
