'use strict'

var mongoose = require('mongoose');

var friendSchema = new mongoose.Schema({
  profile_ObjectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  image: {
    type: String
  }
});

module.exports = friendSchema;
