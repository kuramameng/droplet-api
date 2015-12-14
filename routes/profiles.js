var express = require('express');
var router = express.Router();
var profiles = require('../controllers/profiles');

/* GET home page. */
router.get('/', profiles.root.get);
router.post('/', profiles.create.post);
router.patch('/', profiles.updateProfile.patch)
router.patch('/add', profiles.addFriend.patch);
router.patch('/delete', profiles.deleteFriend.patch);
router.delete('/', profiles.destroy.delete);

module.exports = router;
