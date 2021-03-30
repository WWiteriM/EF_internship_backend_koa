const nodemailer = require('nodemailer');
const fs = require('fs').promises;
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

async function createMustacheFiles() {
  const template = await fs.readFile(`${__dirname}/mustache/templates/template.html`);
  const header = await fs.readFile(`${__dirname}/mustache/components/header.html`);
  const body = await fs.readFile(`${__dirname}/mustache/components/body.html`);
  const footer = await fs.readFile(`${__dirname}/mustache/components/footer.html`);

  const mustacheFiles = {
    template: template.toString(),
    header: header.toString(),
    body: body.toString(),
    footer: footer.toString(),
  };

  if (!mustacheFiles) {
    throw ErrorService.errorThrow(500);
  }
  return mustacheFiles;
}

async function registrationMailer(params) {
  const { template, header, body, footer } = await createMustacheFiles();
  const { email, name, surname } = params;

  await transporter.sendMail({
    from: `"Effective Soft" <${process.env.MAIL}>`,
    to: `${email}`,
    subject: 'Hello from EffectiveSoft Internship',
    text: `Hello ${name}`,
    html: Mustache.render(template, { email, name, surname }, { header, body, footer }),
  });
}

module.exports = registrationMailer;
