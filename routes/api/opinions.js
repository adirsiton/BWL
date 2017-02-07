var express = require('express');
var router = express.Router();

var api = require('./api');

router.get('/all/', function(req, res, next) {
    userDB.getAllOpinions(function(err, data) {
        if(err) {
            console.log(err);
            res.status(404).send('Cannot get opinions');
        }
        else {
            res.send(data);
        }
    })
});

router.get('/:userfbId', function(req, res, next) {
    userDB.getUserOpinions(req.params.userfbId, function(err, data) {
        if(err) {
            console.log(err);
            res.status(404).send('Cannot get user opinions');
        }
        else {
            res.send(data);
        }
    })
});

router.get('/update', function(req, res, next) {
    userDB.updateOpinion(req.body.updatedOpinion, function(err, data) {
        if(err) {
            console.log(err);
            res.status(404).send('Cannot update opinion');
        }
        else {
            res.send(data);
        }
    })
});

router.get('/add', function(req, res, next) {
    userDB.addOpinion(req.body.newOpinion, function(err, data) {
        if(err) {
            console.log(err);
            res.status(404).send('Cannot add new opinion');
        }
        else {
            res.send(data);
        }
    })
});

module.exports = router;