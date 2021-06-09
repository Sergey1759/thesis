var mongoose = require('mongoose')
var crypto = require('crypto')
var db = mongoose.connect("mongodb+srv://admin:admin@cluster0.64ha8.mongodb.net/mydatabase")
var User = require('../models/User');


exports.createUser = async function (userData) {
  let user_local = await User.findOne({
    email: userData.email
  });
  if (user_local) {
    console.log('user_local')
    console.log(user_local)
    return Promise.reject(false);
  } else {

        var user = {
            name: userData.name,
            lastname: userData.last_name,
            email: userData.email,
            photo: userData.photo,
            phone: userData.phone,
            role: 'user',
            password: hash(userData.password),
          }
          return Promise.resolve(new User(user).save())
          .catch(e=>{
            console.log('err');
            return e
          });


  }
}

exports.checkUser = function (userData) {
  return User
    .findOne({
      email: userData.email
    })
    .then(function (doc) {
      if (doc.password == hash(userData.password)) {
        console.log("User password is ok");
        console.log(doc);
        return Promise.resolve(doc)
      } else {
        return Promise.reject("Error wrong")
      }
    })
}


exports.getByID = function (id) {
  return User.findById(id, function (err, doc) {
    return Promise.resolve(doc);
  });
}





exports.getAll = function (id) {
  return User.find({}, function (err, doc) {
    return Promise.resolve(doc);
  });
}






exports.updateImg = async function (id, url) {
  return User.findOneAndUpdate({
    _id: id
  }, {
    photo: url
  });
}
exports.updateByIdFromFields = async function (id, field, value) {
  return User.findOneAndUpdate({
    _id: id
  }, {
    [field]: value
  });
}

exports.updateConfirmCode = async function (id, code) {
  return User.findOneAndUpdate({
    _id: id
  }, {
    confirm_code: code
  });
}

function hash(text) {
  return crypto.createHash('sha1')
    .update(text).digest('base64')
}

exports.hash = function (text) {
  return hash(text);
}
