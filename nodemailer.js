const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jww.eservice@gmail.com',
        pass: 'Phoenix35'
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '<jww.eservice@gmail.com>', // sender address
    to: `${drafter}`, // list of receivers
    subject: 'Estate documents received from' `${drafter}`, // Subject line
    text: 'well at least this is working...', // plain text body
    // html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Messages sent:', info.messageId, info.response);
});
