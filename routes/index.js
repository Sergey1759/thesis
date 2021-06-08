var express = require('express');
var router = express.Router();
const ApiUser = require('../Api/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/sign', function(req, res, next) {
  res.render('sign', { title: 'Express' });
});

router.post('/sign_post',async function(req, res, next) {
  console.log(req.body);
  let isEroor = true;
  let user = await ApiUser.createUser(req.body);
  console.log(user);
  if(isEroor){
    res.send({message : 'Invalid something'});
  } else{
    
  }
  // res.render('sign', { title: 'Express' });
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
