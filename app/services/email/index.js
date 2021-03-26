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

async function registrationMailer(body) {
  const mailOptions = {
    from: `"Effective Soft" <${process.env.MAIL}>`,
    to: `${body.email}`,
    subject: 'Hello from EffectiveSoft Internship',
    text: `Hello ${body.name}!`,
    html: `<h1>Hello ${body.name}!</h1>
           <div>You have just registered on the EF-soft social network. Please save this message. Your account parameters are as follows: </div>
           <ul><li>Email: ${body.email}</li><li>Name: ${body.name}</li><li>Surname: ${body.surname}</li></ul>`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = registrationMailer;
