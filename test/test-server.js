const express = require('express');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');
var request = require('superagent');

const expect = chai.expect;
const should = chai.should();

const {EstateDoc} = require('.././models/draft');
const {app} = require('../server');

chai.use(chaiHttp);

function EstateDocPostData() {
    return {
      name: {
        firstName: faker.name.firstName(),
        lastName: faker.name.firstName(),
        middleName: faker.name.firstName(),
        suffix: faker.name.suffix(),
        },
      socialSecurity: "555-55-5555",
      address: faker.address.streetAddress(),
      telephone: faker.phone.phoneNumber(),
      heir: faker.name.firstName()
  }
};

describe('document-send form', () => {

  it('should give the html and status of 200', (done) => {
     chai.request(app)
    .get('/')
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
  });

    it('should add a new EstateDoc form', () => {

      const newEstateDoc = EstateDocPostData();
      console.log(newEstateDoc);
      return chai.request(app)
        .post('/document')
        .send(newEstateDoc)
        .then(function(res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys(
            'id', 'firstName', 'lastName', 'telephone');
          // cause Mongo should have created id on insertion
          res.body.id.should.not.be.null;

          return EstateDoc.findById(res.body.id);
        })
        .then(function(estatedoc) {
          estatedoc.firstName.should.equal(newEstateDoc.firstName);
          estatedoc.lastName.should.equal(newEstateDoc.lastName);
          estatedoc.telephone.should.equal(newEstateDoc.telephone);
        });
    });
});//describe('document-send form')
