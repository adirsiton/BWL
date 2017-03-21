var express = require('express');
var router = express.Router();

var opinionDB = require('../../controllers/DAL/opinions.db');

router.get('/', function(req, res, next) {
    opinionDB.getAllOpinions(function(err, data) {
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
    opinionDB.getUserOpinions(req.params.userfbId, function(err, data) {
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
    opinionDB.updateOpinion(req.body.updatedOpinion, function(err, data) {
        if(err) {
            console.log(err);
            res.status(404).send('Cannot update opinion');
        }
        else {
            res.send(data);
        }
    })
});

router.post('/add', function(req, res, next) {
    opinionDB.addOpinion(req.body, function(err, data) {
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