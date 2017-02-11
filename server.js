const express = require('express');
const path = require('path');
const mailer = require('nodemailer');
const Docxtemplater = require('docxtemplater');
const JSZip = require('jszip');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');

let app = express();

var content = fs
    .readFileSync(path.resolve(__dirname, 'docxGen.docx'), 'binary');

var zip = new JSZip(content);

app.use(express.static('public'));
app.use('/libs', express.static('./node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.post('/document', (req, res, next) => {
  res.status(201).json(req.body);
  var doc = new Docxtemplater();
  doc.loadZip(zip);

  doc.setData({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    middleName: req.body.middleName,
    suffix: req.body.suffix,
    socialSecurity: req.body.socialSecurity,
    address:req.body.address,
    telephone:req.body.telepone,
    heir: req.body.heir
  });
    try {
        doc.render()
    }
    catch (error) {
        var e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties,
        }
        console.log(JSON.stringify({error: e}));
        throw error;
    }
    var buf = doc.getZip()
                 .generate({type: 'nodebuffer'});
    fs.writeFileSync(path.resolve('../doc-sender-catcher', 'output.docx'), buf);
});

app.get('*', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(process.env.PORT || 8080, () => {
    console.log(`Express running on port ${process.env.PORT || 8080}`);
});

module.exports = {app};
