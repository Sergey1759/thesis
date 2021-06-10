let express = require('express');
let router = express.Router();
const ApiUser = require('../Api/User');
const {sendMail} = require('../service/Mail');

let randomstring = require("randomstring");
var multer = require('multer');
var path = require('path');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(222222222222);
    console.log(__dirname);
    cb(null, path.join('./', 'uploads'))
  },
  filename: function (req, file, cb) {
    let name = file.originalname;
    let k = name.replace('.jpg', '')
    cb(null, k + '' + curentTime())
  }
})
var upload = multer({
  storage: storage
});

function curentTime() {
  var date = new Date();
  let str = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()} `;
  return str;
}
// let _multer = upload.single('avatar');




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  if (req.session.user) return res.redirect('/');
  res.render('login', { title: 'Express' });
});

router.get('/some1', function(req, res, next) {
  res.render('some1', { title: 'Express' });
});

router.get('/redirect', function(req, res, next) {
  res.render('redirect', { title: 'Express' });
});



router.get('/profile', function(req, res, next) {
  res.render('profile', { title: 'Express' });
});

router.get('/card', function(req, res, next) {
  res.render('card', { title: 'Express' });
});

router.post('/login', function(req, res, next) {
  if (req.session.user) return res.redirect('/');
  // console.log(req.body);
  ApiUser.checkUser(req.body)
      .then(function (user) {
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
        res.status(200).json({
          answer: "неверный логин или пароль"
        });
        return next(error)
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


router.get('/re-rent', midleware, async function(req, res, next) {
  res.render('re-rent', { title: 'Express' });
});

router.post('/re-rent', midleware, upload.single('avatar'),  async function(req, res, next) {
  console.log(req.body);
});

router.get('/to-sold', midleware,function(req, res, next) {
  res.render('to-sold', { title: 'Express' });
});

//midlle_for_multer

router.get('/category', function(req, res, next) {
  res.render('category', { title: 'Express' });
});

router.get('/logout', function (req, res, next) {
  if (req.session.user) {
    delete req.session.user;
    res.redirect('/')
  }
});


function midleware (req, res, next) {
  if(req.session.user){ next();
  } else {
    res.redirect('/redirect');
  }
};

module.exports = router;
