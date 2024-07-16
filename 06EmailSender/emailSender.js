var nodemailer = require('nodemailer');
require('dotenv').config();
var transporter = nodemailer.createTransport({
    service: 'gmail',
    secure:true,
    port:456,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls:{rejectUnauthorized:false}
});

var mailOptions = {
    to: 'ashishkunar678@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});