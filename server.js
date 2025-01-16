// filepath: /C:/Users/l1016358/Inventory/server.js
const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
  const { recipient, subject, text } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'Outlook365',
    auth: {
      user: 'your-email@outlook.com',
      pass: 'your-email-password'
    }
  });

  let mailOptions = {
    from: 'your-email@outlook.com',
    to: recipient,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.send('Email sent: ' + info.response);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});