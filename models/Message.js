'use strict'

var mongoose = require('mongoose');

var todaysDate = function(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {
        dd='0'+dd
    }
    if(mm<10) {
      mm='0'+mm
    }
    today = mm+'/'+dd+'/'+yyyy;
    return today;
  };

var messageSchema = new mongoose.Schema({
  profile_ObjectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Profile'
  },
  friend_ObjectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Friend'
  },
  weather: {
    type: String,
    required: true
  },
  message_body: {
    type: String,
    required: true
  },
  date: {
    type: 'String',
    default: todaysDate(),
    required: true,
    ref: 'Message Date'
  },
});

module.exports = messageSchema;
