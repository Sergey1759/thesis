let express = require('express');
let router = express.Router();
const ApiUser = require('../Api/User');
const {sendMail} = require('../service/Mail');

let randomstring = require("randomstring");




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  if (req.session.user) return res.redirect('/');
  res.render('login', { title: 'Express' });
});



router.post('/login', function(req, res, next) {

  console.log(req.body);
  ApiUser.checkUser(req.body)
      .then(function (user) {
        console.log(1111111111111111111);
        if (user) {
          req.session.user = {
            id: user._id,
            name: user.name,
            group: user.group,
          }


          res.redirect('/')
        } else {
          console.log(2);

          res.redirect('/')
        }
      })
      .catch(function (error) {
        console.log(3);
        // res.status(200).json({
        //   answer: "неверный логин или пароль"
        // });
        // return next(error)
      })
});

router.get('/sign', function(req, res, next) {
  res.render('sign', { title: 'Express' });
});

router.post('/sign_post',async function(req, res, next) {
  console.log(req.body);
  let isEroor = true;
  let user = await ApiUser.createUser(req.body);

  if(isEroor){
    res.send({message : user});
  } else{
    // req.session.user = {
    //   id: user._id,
    //   name: user.name
    // }
    res.status(200).send({code : 'ok'});
  }

  // res.render('sign', { title: 'Express' });
});


router.get('/re-rent', async function(req, res, next) {
  res.render('re-rent', { title: 'Express' });
});

router.get('/to-sold', function(req, res, next) {
  res.render('to-sold', { title: 'Express' });
});

router.get('/category', function(req, res, next) {
  res.render('category', { title: 'Express' });
});

// function midleware (req, res, next) {
//   if(req.session.user){ next();
//   } else {
//     res.redirect('/');
//   }
// };

module.exports = router;
