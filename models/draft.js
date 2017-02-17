const mongoose = require('mongoose');

const draftSchema = mongoose.Schema({
  name: {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    middleName: {type: String, required: false},
    suffix: {type: String, required: false},
    },
  socialSecurity: {type: String, required: true},
  address:{type: String, required: true},
  telephone:{type: String, required: true},
  heir: {type: String, required: true}
}); //draftSchema

const EstateDoc = mongoose.model('estateDocs', draftSchema);

module.exports = {EstateDoc}
