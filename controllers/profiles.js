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
                    cart: []
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
    // addFriend : {
    //     patch : function(req, res, next) {
    //         Profile.find({user_ObjectId: req.user._id}).exec().then(function(profile){
    //             if (!req.session.cart) req.session.cart = [];
    //             req.session.cart.push(req.body.temp);
    //             profile[0].cart.push(req.body.temp);
    //             profile[0].save(function(err){
    //                 if (err) return next(err);
    //                 res.send('added');
    //             });
    //         });
    //     }
    // },
    // deleteCart : {
    //     patch : function(req, res, next) {
    //         Profile.find({user_ObjectId: req.user._id}).exec().then(function(profile){
    //             req.session.cart.splice(req.session.cart.indexOf(req.body.temp),1);
    //             profile[0].cart.splice(profile[0].cart.indexOf(req.body.temp),1);
    //             profile[0].save(function(err){
    //                 if (err) return next(err);
    //                 res.send('deleted');
    //             });
    //         });
    //     }
    // },
    destroy : {
        delete : function(req, res, next) {
            Profile.remove({user_ObjectId: req.user._id}, function(err, profile) {
                if (err) return next(err);
                res.send(profile); // see results
            });
        }
    }
};
