const express = require('express');
const Docxtemplater = require('docxtemplater');
const JSZip = require('jszip');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

function estateWordDoc (data) {

let content = fs.readFileSync(path.resolve(__dirname, 'docxGen.docx'), 'binary');

let zip = new JSZip(content);

    let doc = new Docxtemplater();
    doc.loadZip(zip);

    doc.setData({
      firstName: data.firstName,
      lastName: data.lastName,
      middleName: data.middleName,
      suffix: data.suffix,
      socialSecurity: data.socialSecurity,
      address: data.address,
      telephone: data.telephone,
      heir: data.heir
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
      fs.writeFileSync(path.resolve(__dirname + '/doc-sender-catcher', 'output.docx'), buf)
    };

module.exports = {estateWordDoc};
