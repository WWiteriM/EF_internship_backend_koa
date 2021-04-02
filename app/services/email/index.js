const nodemailer = require('nodemailer');
const fs = require('fs');
const Mustache = require('mustache');
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

function createMustacheFiles() {
  const recovery = fs.readFileSync(`${__dirname}/mustache/templates/recovery.html`);
  const registration = fs.readFileSync(`${__dirname}/mustache/templates/registration.html`);
  const header = fs.readFileSync(`${__dirname}/mustache/components/header.html`);
  const registrationBody = fs.readFileSync(
    `${__dirname}/mustache/components/registrationBody.html`,
  );
  const recoveryBody = fs.readFileSync(`${__dirname}/mustache/components/recoveryBody.html`);
  const footer = fs.readFileSync(`${__dirname}/mustache/components/footer.html`);

  const mustacheFiles = {
    recovery: recovery.toString(),
    registration: registration.toString(),
    header: header.toString(),
    registrationBody: registrationBody.toString(),
    recoveryBody: recoveryBody.toString(),
    footer: footer.toString(),
  };

  if (!mustacheFiles) {
    throw ErrorService.errorThrow(500);
  }
  return mustacheFiles;
}

const mustacheFiles = createMustacheFiles();

async function registrationMailer(params) {
  const { registration, header, registrationBody, footer } = mustacheFiles;
  const { email, name, surname } = params;

  await transporter.sendMail({
    from: `"Effective Soft" <${process.env.MAIL}>`,
    to: `${email}`,
    subject: 'Hello from EffectiveSoft Internship',
    text: `Hello ${name}`,
    html: Mustache.render(
      registration,
      { email, name, surname },
      { header, registrationBody, footer },
    ),
  });
}

async function recoveryMailer(params, token) {
  const { recovery, header, recoveryBody, footer } = mustacheFiles;
  const { email } = params;

  await transporter.sendMail({
    from: `"Effective Soft" <${process.env.MAIL}>`,
    to: `${email}`,
    subject: 'Password recovery',
    text: 'Hello from EF-soft',
    html: Mustache.render(recovery, { email, token }, { header, recoveryBody, footer }),
  });
}

module.exports = { registrationMailer, recoveryMailer };
