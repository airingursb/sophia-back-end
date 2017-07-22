var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
var md5 = require('md5');

var UserModel = require('../models').User;

var KEY = require('./config').KEY;
var MESSAGE = require('./config').MESSAGE;

router.get('/login', function (req, res, next) {

  var timestamp = new Date().getTime();

  if (req.query.phonenumber == null
    || req.query.password == null) {
    return res.jsonp({status: 1000, msg: MESSAGE.PARAMETER_ERROR})
  }

  UserModel.findOne({
    where: {
      phonenumber: req.query.phonenumber
    }
  }).then(function (user) {
    if (!user) {
      return res.jsonp({status: 1002, msg: MESSAGE.USER_NOT_EXIST});
    }
    if (user.password !== req.query.password) {
      return res.jsonp({status: 1003, msg: MESSAGE.PASSWORD_ERROR});
    }
    var token = md5(user.id + timestamp + KEY);
    return res.jsonp({status: 0, timestamp: timestamp, token: token, data: user, msg: MESSAGE.SUCCESS});
  });
});

router.get('/register', function (req, res, next) {

  var timestamp = new Date().getTime();

  if (req.query.face_url == null
    || req.query.password == null
    || req.query.username == null
    || req.query.phonenumber == null) {
    return res.jsonp({status: 1000, msg: MESSAGE.PARAMETER_ERROR})
  }

  var user = {
    phonenumber: req.query.phonenumber,
    password: sha1(req.query.password),
    face_url: req.query.face_url,
    username: req.query.username,
    sex: req.query.sex ? req.query.sex : 0,
    school: req.query.school ? req.query.school : '',
    className: req.query.className ? req.query.className : '',
    state: 0,
    creatdAt: timestamp
  };
  UserModel.findOne({
    where: {
      phonenumber: user.phonenumber
    }
  }).then(function (result) {
    if (!result) {
      UserModel.create(user).then(function (user) {
        var token = md5(user.id + timestamp + KEY);
        return res.jsonp({status: 0, timestamp: timestamp, data: user, token: token, msg: MESSAGE.SUCCESS});
      });
    } else {
      return res.jsonp({status: 1005, msg: MESSAGE.USER_ALREADY_EXIST});
    }
  });
});

module.exports = router;
