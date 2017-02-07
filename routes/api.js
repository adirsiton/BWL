var express = require('express');
var router = express.Router();

var api = require('./api');

router.get('/users', function(req, res, next) {
  router.use(api.users);
});

router.get('/opinions', function(req, res, next) {
  router.use(api.opinions);
});

router.get('/works', function(req, res, next) {
  router.use(api.works);
});

module.exports = router;