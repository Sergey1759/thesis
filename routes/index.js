var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/re-rent', function(req, res, next) {
  res.render('re-rent', { title: 'Express' });
});

router.get('/to-sold', function(req, res, next) {
  res.render('to-sold', { title: 'Express' });
});

router.get('/category', function(req, res, next) {
  res.render('category', { title: 'Express' });
});

module.exports = router;
