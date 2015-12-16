var Profile = require('../models').model('Profile');
var db = require('../models/index');

module.exports = {
    deny : function(req, res) {
            res.sendStatus(405);
    },
    root : {
        get : function (req, res, next) {
          Profile.find({user_ObjectId: req.user._id}).exec().then(function(profile) {
            res.json(profile);
          }).catch(function(error) {
            next(error);
          });
        }
    },
    create : {
        post : function(req, res, next) {
            var pProfile = new Promise(function(res, rej) {
                Profile.create({
                    user_ObjectId : req.user._id,
                    address : req.body.address,
                    first_name : req.body.first_name,
                    last_name : req.body.last_name,
                    email : req.body.email,
                    phone : req.body.phone,
                    image : req.body.image,
                    friend_list : []
                }, function(err, profile) {
                    if(err) {
                        rej(err);
                        return;
                    }
                    res(profile);
                });
            });
            pProfile.then(function() {
                res.sendStatus(200);
                res.send('Created');
                return this.save();
            }).catch(function(err) {
                next(err);
            });
        }
    },
    updateProfile : {
        patch : function(req, res, next) {
            Profile.find({user_ObjectId: req.user._id}).exec().then(function(profile){
                profile[0].username = req.body.username;
                profile[0].first_name = req.body.first_name;
                profile[0].last_name = req.body.last_name;
                profile[0].location = req.body.location;
                profile[0].email = req.body.email;
                profile[0].phone = req.body.phone;
                profile[0].save(function(err){
                    if (err) return next(err);
                    res.send('Profile updated');
                });
            });
        }
    },
    addFriend : {
        patch : function(req, res, next) {
            Profile.find({user_ObjectId: req.user._id}).exec().then(function(profile){
                profile[0].friend_list.push(req.body.friend);
                profile[0].save(function(err){
                    if (err) return next(err);
                    res.send('friend added');
                });
            });
        }
    },
    deleteFriend : {
        patch : function(req, res, next) {
            Profile.find({user_ObjectId: req.user._id}).exec().then(function(profile){
                profile[0].friend_list.splice(profile[0].friend_list.indexOf(req.body.friend),1);
                profile[0].save(function(err){
                    if (err) return next(err);
                    res.send('deleted');
                });
            });
        }
    },
    destroy : {
        delete : function(req, res, next) {
            Profile.remove({user_ObjectId: req.user._id}, function(err, profile) {
                if (err) return next(err);
                res.send(profile); // see results
            });
        }
    }
};
