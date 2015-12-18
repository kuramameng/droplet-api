var Friend = require('../models').model('Friend');
var Profile = require('../models').model('Profile');
var db = require('../models/index');

module.exports = {
    deny : function(req, res) {
            res.sendStatus(405);
    },
    root : {
        get : function index(req, res, next) {
            var currentProfileId;
            Profile.find({user_ObjectId: req.user._id}).exec().then(function(profile) {
                currentProfileId = profile[0]._id;
                Friend.find({profile_ObjectId: currentProfileId}).exec().then(function(friend) {
                    res.json(friend);
                }).catch(function(error) {
                    next(error);
                });
            }).catch(function(err) {
                next(err);
            });
        }
    },
    show : {
        get : function(req, res, next) {
            Friend.find({_id: req.params.id}).exec().then(function(friend){
                res.json(friend);
            }).catch(function(error){
                next(error);
            });
        }
    },
    create : {
        post : function(req, res, next) {
            var currentProfileId;
            Profile.find({user_ObjectId: req.user._id}).exec().then(function(profile) {
                currentProfileId = profile[0]._id;
                var pFriend = new Promise(function(res, rej) {
                    Friend.create({
                        profile_ObjectId : currentProfileId,
                        first_name : req.body.first_name,
                        last_name : req.body.last_name,
                        location : req.body.location,
                        email : req.body.email,
                        phone : req.body.phone,
                        image : req.body.image
                    }, function(err, friend) {
                        if(err) {
                            rej(err);
                            return;
                        }
                        res(friend);
                    });
                });
                return pFriend;
            }).then(function(friend) {
                res.json("Friend created");
            }).catch(function(err) {
                    next(err);
                });
        }
    },
    update : {
        patch : function(req, res, next) {
            Friend.find({_id: req.body._id}).exec().then(function(friend){
                friend[0].first_name = req.body.first_name,
                friend[0].last_name = req.body.last_name,
                friend[0].location = req.body.location,
                friend[0].phone = req.body.phone,
                friend[0].image = req.body.image,
                friend[0].save(function(err){
                    if (err) return next(err);
                    res.send('Friend updated');
                });
            });
        }
    },
    destroy : {
        delete : function(req, res, next) {
            Friend.remove({_id: req.body._id}, function(err, friend) {
                if (err) return next(err);
                res.send(friend); // see results
            });
        }
    }
};
