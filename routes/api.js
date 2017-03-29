var express = require('express');
var router = express.Router();

var apiWorks = require('./api/works');
var apiOpinions = require('./api/opinions');
var apiUsers = require('./api/users');
var apiGallery = require('./api/gallery')

router.use('/works', apiWorks);

router.use('/opinions', apiOpinions);

router.use('/users', apiUsers);

router.use('/gallery', apiGallery);

module.exports = router;