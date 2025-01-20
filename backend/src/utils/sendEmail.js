const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.SMTP_SERVER_USERNAME,
    pass: process.env.SMTP_SERVER_PASSWORD,
  },
});

const sendEmail = async (options) => {
  const message = {
    from: process.env.SMTP_SERVER_USERNAME,
    to: options.to,
    subject: options.subject,
    html: options.message,
  };


  const info = await transporter.sendMail(message);
  return info;
  console.log(`Message sent: ${info.messageId}`);
};

module.exports = sendEmail;