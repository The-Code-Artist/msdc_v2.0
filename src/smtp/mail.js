const nodemailer = require("nodemailer");
require("dotenv").config();

// Store SMTP user secrets in an object.
const auth = {
    username: process.env.MAIL_USER,
    password: process.env.MAIL_PASS
};

// Define a transport for sending emails.
const transport = nodemailer.createTransport({
    host: "localhost",
    port: 25,
    secure: false,
    auth: {
        user: auth.username,
        pass: auth.password
    }
});

// Use the defined transport object to send an email.
const sendEmail = (name, email, phone, subject, message, callback) => {
    // Store all mail options in an object.
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
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
