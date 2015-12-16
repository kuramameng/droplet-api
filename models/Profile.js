'use strict'

var mongoose = require('mongoose');

var profileSchema = new mongoose.Schema({
  user_ObjectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  username: {
    type: String
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  image: {
    type: String
  }
});

module.exports = profileSchema;
