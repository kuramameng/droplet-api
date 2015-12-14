var express = require('express');
var router = express.Router();
var messages = require('../controllers/messages');

/* GET home page. */
router.get('/', messages.root.get);
router.post('/', messages.create.post);
router.delete('/', messages.destroy.delete);

module.exports = router;
