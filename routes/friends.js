var express = require('express');
var router = express.Router();
var friends = require('../controllers/friends');

/* GET home page. */
router.get('/', friends.root.get);
router.post('/', friends.create.post);
router.patch('/', friends.update.patch);
router.delete('/', friends.destroy.delete);

module.exports = router;
