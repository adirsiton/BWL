var express = require('express');
var router = express.Router();

var opinionDB = require('../../controllers/DAL/works.db');

router.post('/remove/:opinionId', function(req, res, next) {
    opinionDB.removeOpinion(req.params.userfbId, function(err, data) {
        if(err) {
            console.log(err);
            res.status(404).send('Cannot remove opinion');
        }
        else {
            res.send(data);
        }
    })
});

module.exports = router;