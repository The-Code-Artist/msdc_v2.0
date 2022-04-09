const nodemailer = require("nodemailer");
require("dotenv").config();

// Store SMTP user secrets in an object.
const auth = {
    username: process.env.MAIL_USER,
    password: process.env.MAIL_PASS
};

// Define a transport for sending emails.
const transport = nodemailer.createTransport({
    host: "mail.msdc.africa",
    port: 465,
    secure: true,
    auth: {
        user: auth.username,
        pass: auth.password
    }
});

// Use the defined transport object to send an email.
const sendEmail = (email, subject, message, callback) => {
    // Store all mail options in an object.
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: "help.me@msdc.africa",
        subject: subject,
        html: message
    };

    // Use the defined transport object to send the composed email.
    transport.sendMail(mailOptions, (err, data) => {
        if (err)
            callback(err, null);
        else callback(null, data);
    });
}

module.exports = sendEmail;
