var express = require('express');
var router = express.Router();
const ApiUser = require('../Api/User');
const {sendMail} = require('../service/Mail');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/login', function(req, res, next) {
  if (req.session.user) return res.redirect('/');

  ApiUser.checkUser(req.body)
    .then(function(user){
      if(user){
        req.session.user = {id: user._id, name: user.name}
        res.redirect('/')
      } else {
        return next(error)
      }
    })
    .catch(function(error){
    return next(error)
    })
    
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


router.get('/re-rent', async function(req, res, next) {
  await sendMail('serhii.lysytskyi@ukd.edu.ua', '1234');
  res.render('re-rent', { title: 'Express' });
});

router.get('/to-sold', function(req, res, next) {
  res.render('to-sold', { title: 'Express' });
});

router.get('/category', function(req, res, next) {
  res.render('category', { title: 'Express' });
});

function midleware (req, res, next) {
  if(req.session.user){ next();
  } else {
    res.redirect('/');
  }
};

module.exports = router;
