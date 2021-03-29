const nodemailer = require('nodemailer');
const fs = require('fs');
// const Mustache = require('mustache');
const ErrorService = require('../../middleware/error/errorServices');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASSWORD,
  },
});

const mustacheFiles = {
  header: fs.readFile(`${__dirname}/mustache/header.html`, 'utf8', (err, data) => {
    if (err) {
      throw ErrorService.errorThrow(500);
    }
    return data.toString();
  }),
  htmlBody: fs.readFile(`${__dirname}/mustache/registrationBody.html`, 'utf8', (err, data) => {
    if (err) {
      throw ErrorService.errorThrow(500);
    }
    return data.toString();
  }),
  footer: fs.readFile(`${__dirname}/mustache/footer.html`, 'utf8', (err, data) => {
    if (err) {
      throw ErrorService.errorThrow(500);
    }
    return data.toString();
  }),
};

async function registrationMailer(body) {
  const { header, htmlBody, footer } = mustacheFiles;
  const mailOptions = {
    from: `"Effective Soft" <${process.env.MAIL}>`,
    to: `${body.email}`,
    subject: 'Hello from EffectiveSoft Internship',
    text: `Hello ${body.name}, ${htmlBody}, ${footer}, ${header}!`,
    // html: Mustache.render({ header, htmlBody, footer }, body),
  };

  await transporter.sendMail(mailOptions);
}

module.exports = registrationMailer;
