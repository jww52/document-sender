const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const Docxtemplater = require('docxtemplater');
const JSZip = require('jszip');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const morgan = require('morgan');
require('dotenv').config();

const {ALERT_FROM_EMAIL, ALERT_FROM_NAME, ALERT_TO_EMAIL} = process.env;
const {sendEmail} = require('./emailer');
const {estateDoc} = require('./docxtemplater');
let app = express();

app.use(express.static('public'));
app.use('/libs', express.static('./node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.post('/document', (req, res, next) => {

  res.status(201).json(req.body);

  estateDoc(req.body);


    //nodemailer

      let emailData = {
      from: ALERT_FROM_EMAIL,
      to: ALERT_TO_EMAIL,
      subject: `ESTATE DOCUMENT FROM: ${req.body.firstName} ${req.body.lastName}`,
      attachments: [{
        filename: 'output.docx',
        content: fs.createReadStream(__dirname + '/doc-sender-catcher/output.docx')
      }]
    };
    sendEmail(emailData);
  });


app.get('*', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(process.env.PORT || 8080, () => {
    console.log(`Express running on port ${process.env.PORT || 8080}`);
});

module.exports = {app};
