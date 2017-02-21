const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const Docxtemplater = require('docxtemplater');
const JSZip = require('jszip');
const bodyParser = require('body-parser');
const fs = require('fs');
const morgan = require('morgan');
const _ = require('lodash');
require('dotenv').config();

const {mongoose} = require('./db/mongoose');
const {ObjectId} = require('mongodb');
const {ALERT_FROM_EMAIL, ALERT_FROM_NAME, ALERT_TO_EMAIL} = process.env;
const {sendEmail} = require('./emailer');
const {estateWordDoc} = require('./docxtemplater');
const {EstateDoc} = require('./models/draft');
const {PORT, DATABASE_URL} = require('./config');

mongoose.Promise = global.Promise;

let app = express();

app.use(express.static('public'));
app.use('/libs', express.static('./node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.post('/document', (req, res, next) => {
  //schema start
  EstateDoc
    .create({
      name: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        middleName: req.body.middleName,
        suffix: req.body.suffix
        },
      socialSecurity: req.body.socialSecurity,
      address: req.body.address,
      telephone: req.body.telephone,
      heir: req.body.heir
    })
    .then(
      estateDoc => res.status(201).json(req.body))
    .catch(err => {
      res.status(500).json(err);
    });
  // schema end
  estateWordDoc(req.body);
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

  app.get('/', (req, res) => {
      res.status(200).sendFile(path.join(__dirname, './public/index.html'));
  });

app.get('/document/:id', (req, res) => {
  var id = req.params.id;
  //validate id using isValid
  EstateDoc
      .findById(req.params.id)
      .then((estatedoc) => {
        res.send(estatedoc);
      })
      .catch(err => {
        console.error(err);
          res.status(500).json({message: 'Internal server error'})
      });
  });

  app.put('/document/:id', (req, res) => {
  if (!(req.params.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }

  const updated = {};
  const updateableFields = ['name', 'socialSecurity', 'address','telephone','heir'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  EstateDoc
    .findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
    .exec()
    .then((estatedoc) => res.status(204).json(estatedoc))
    .catch(err => res.status(500).json({message: 'Something went wrong'}));
});

app.delete('/document/:id', (req, res) => {
  EstateDoc
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(estatedoc => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});



  let server;

  function runServer(databaseUrl=DATABASE_URL, port=PORT) {
    return new Promise((resolve, reject) => {
      mongoose.connect(databaseUrl, err => {
        if (err) {
          return reject(err);
        }

        app.listen(port, () => {
          console.log(`Your app is listening on port ${port}`);
          resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
      });
    });
  }

  if (require.main === module) {
  runServer().catch(err => console.error(err));
};
module.exports = {app};
