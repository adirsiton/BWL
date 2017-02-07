var express = require('express');
var router = express.Router();

var workDB = require('../../controllers/DAL/works.db');

router.get('/', function(req, res, next) {
    workDB.getAllWorks(function(err, data) {
        if(err) {
            console.log(err);
            res.status(404).send('Cannot get all works');
        }
        else {
            res.send(data);
        }
    })
});

router.get('/:workId', function(req, res, next) {
    workDB.getAllWorks(req.params.workId, function(err, data) {
        if(err) {
            console.log(err);
            res.status(404).send('Cannot get work');
        }
        else {
            res.send(data);
        }
    })
});

// MOVE TO ADMIN
/*router.post('/add', function(req, res, next) {
    workDB.getAllWorks(req.body.newWork, function(err, data) {
        if(err) {
            console.log(err);
            res.status(404).send('Cannot add work');
        }
        else {
            res.send(data);
        }
    })
});*/



module.exports = router;