var express = require('express');
var router = express.Router();
var profiles = require('../controllers/profiles');

/* GET home page. */
router.get('/', profiles.root.get);
router.post('/', profiles.create.post);
// router.patch('/add', profiles.addCart.patch);
// router.patch('/delete', profiles.deleteCart.patch);
router.delete('/', profiles.destroy.delete);

module.exports = router;
