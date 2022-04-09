const express = require('express');
const sendEmail = require('../smtp/mail');

const contactRouter = express.Router();

contactRouter.get('', (req, res) => {
  res.render('contact', {
    title: 'Contact',
    layout: './layouts/cardless-layout',
  });
});

contactRouter.post('', (req, res) => {
  // TODO: Retrieve form field data and store the values into variables.
  const { name, email, phone, subject, message } = req.body;

  const messageBody = `Name: ${name}<br />Email: ${email}<br />Phone: ${phone}<br/>Message: ${message}`;

  sendEmail(email, subject, messageBody, (err, data) => {
    if (err) {
      res.status(500).json({ msg: 'An internal error occurred.' });
    } else {
      res.json({
        msg: 'Your message has successfully been sent to MSDC Inc (Pty) Ltd.',
      });
    }
  });
});

module.exports = contactRouter;
