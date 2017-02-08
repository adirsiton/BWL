var express = require('express');
var router = express.Router();

var apiWorks = require('./api/works');
var apiOpinions = require('./api/opinions');
var apiUsers = require('./api/users');

router.use('/works', apiWorks);

router.use('/opinions', apiOpinions);

router.use('/works', apiUsers);

module.exports = router;