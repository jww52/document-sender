const express = require('express');
const chai = require('chai');
const chaiHttp = require('chai-http');
var request = require('superagent');

const expect = chai.expect;

const {app} = require('../server');

chai.use(chaiHttp);

describe('document-send form', () => {
  it('should give the html and status of 200', (done) => {
     chai.request(app)
    .get('/document')
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
  });
});
