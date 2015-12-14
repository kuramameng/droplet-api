'use strict'

var mongoose = require('mongoose');

var profileSchema = new mongoose.Schema({
  user_ObjectId: {
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
  },
  friend_list: {
    type: [mongoose.Schema.Types.ObjectId]
  }
});

module.exports = profileSchema;
