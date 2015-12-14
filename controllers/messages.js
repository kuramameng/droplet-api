var Friend = require('../models').model('Friend');
var Profile = require('../models').model('Profile');
var Message = require('../models').model('Message');
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
                Message.find({profile_ObjectId: currentProfileId}).exec().then(function(message) {
                    res.json(message);
                }).catch(function(error) {
                    next(error);
                });
            });
        }
    },
    create : {
        post : function(req, res, next) {
            var currentProfileId;
            var friendId;
            Profile.find({user_ObjectId: req.user._id}).exec().then(function(profile) {
                currentProfileId = profile[0]._id;
            }).then(function(){
                return Friend.find({profile_ObjectId: currentProfileId}).exec()
            }).then(function(friend){
                    friendId = friend[0]._id;
            }).then(function(){
                console.log(currentProfileId, friendId);
                var pMessage = new Promise(function(res, rej) {
                    Message.create({
                        profile_ObjectId : currentProfileId,
                        friend_ObjectId : friendId,
                        weather : req.body.weather,
                        message_body : req.body.message_body
                    }, function(err, message) {
                        if(err) {
                            rej(err);
                            return;
                        }
                        res(message);
                    });
                });
                return pMessage;
            }).then(function(message) {
                console.log(message);
                res.json("Message saved");
            }).catch(function(err) {
                next(err);
            });
        }
    },
    destroy : {
        delete : function(req, res, next) {
            Message.remove({friend_ObjectId: req.body._id}, function(err, message) {
                if (err) return next(err);
                res.send(message); // see results
            });
        }
    }
};
