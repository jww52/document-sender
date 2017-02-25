'use strict';
const nodemailer = require('nodemailer');
const {SMTP_URL} = process.env;

const sendEmail = (emailData, smtpUrl=SMTP_URL) => {
const transporter = nodemailer.createTransport(SMTP_URL);

  return transporter
    .sendMail(emailData)
    .then(console.log('message sent'));
}

module.exports = {sendEmail};
