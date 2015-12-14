var Friend = require('../models').model('Friend');
var db = require('../models/index');

module.exports = {
    deny : function(req, res) {
            res.sendStatus(405);
    },
    root : {
        get : function (req, res, next) {
          Friend.find({profile_ObjectId: req.profile._id}).exec().then(function(friend) {
            res.json(friend);
          }).catch(function(error) {
            next(error);
          });
        }
    },
    create : {
        post : function(req, res, next) {
            var pFriend = new Promise(function(res, rej) {
                Friend.create({
                    profile_ObjectId : req.profile._id
                }, function(err, friend) {
                    if(err) {
                        rej(err);
                        return;
                    }
                    res(friend);
                });
            });
            pFriend.then(function() {
                res.sendStatus(200);
                res.send('Created');
                return this.save();
            }).catch(function(err) {
                next(err);
            });
        }
    },
    // update : {
    //     patch : function(req, res, next) {
    //         Friend.find({profile_ObjectId: req.profile._id}).exec().then(function(friend){
    //             if (!req.session.cart) req.session.cart = [];
    //             req.session.cart.push(req.body.temp);
    //             friend[0].cart.push(req.body.temp);
    //             friend[0].save(function(err){
    //                 if (err) return next(err);
    //                 res.send('added');
    //             });
    //         });
    //     }
    // },
    destroy : {
        delete : function(req, res, next) {
            Friend.remove({profile_ObjectId: req.profile._id}, function(err, friend) {
                if (err) return next(err);
                res.send(friend); // see results
            });
        }
    }
};
