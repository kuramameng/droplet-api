'use strict';

var mongoose = require('mongoose');
mongoose.Promise = Promise;

mongoose.model('User', require('./User'));
mongoose.model('Profile', require('./Profile'));
mongoose.model('Friend', require('./Friend'));

mongoose.connect("mongodb://localhost/droplet-db");

module.exports = mongoose;
