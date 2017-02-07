var express = require('express');
var router = express.Router();

var workDB = require('../../controllers/DAL/works.db');

router.post('/add', function(req, res, next) {
    workDB.addWork(req.body.newWork, function(err, data) {
        if(err) {
            console.log(err);
            res.status(404).send('Cannot add work');
        }
        else {
            res.send(data);
        }
    })
});

router.post('/update', function(req, res, next) {
    workDB.updateWork(req.body.newWork, function(err, data) {
        if(err) {
            console.log(err);
            res.status(404).send('Cannot update work');
        }
        else {
            res.send(data);
        }
    })
});

module.exports = router;