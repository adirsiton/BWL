var express = require('express');
var router = express.Router();

var userDB = require('../../controllers/DAL/users.db');

router.get('/fbId/:fbId', function(req, res, next) {
    userDB.getUserByFbId(req.params.fbId, function(err, data) {
        if(err) {
            console.log(err);
            res.status(404).send('Cannot get get user by facebook id');
        }
        else {
            res.send(data);
        }
    })
});

router.get('/Id/:Id', function(req, res, next) {
    userDB.getUserById(req.params.Id, function(err, data) {
        if(err) {
            console.log(err);
            res.status(404).send('Cannot get get user by id');
        }
        else {
            res.send(data);
        }
    })
});

router.get('/isadmin/:userId', function(req, res, next) {
    userDB.isAdmin(req.params.userId, (err, isAdmin) => {
        res.status(200).send(isAdmin);
    });
})

module.exports = router;