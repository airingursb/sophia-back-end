var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
var md5 = require('md5');

var UserModel = require('../models').User;
var CodeModel = require('../models').Code;

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

  if (req.query.password == null
    || req.query.username == null
    || req.query.phonenumber == null) {
    return res.jsonp({status: 1000, msg: MESSAGE.PARAMETER_ERROR})
  }

  var user = {
    phonenumber: req.query.phonenumber,
    password: sha1(req.query.password),
    face: 'http://airing.ursb.me/image/cover/philosopherlogo.png',
    username: req.query.username,
    sex: req.query.sex ? parseInt(req.query.sex) : 0,
    school: req.query.school ? req.query.school : '',
    className: req.query.className ? req.query.className : '',
    state: '0',
    createdAt: timestamp
  };
  CodeModel.findOne({
    where: {
      user_account: req.query.phonenumber,
      code: req.query.code,
      used: false,
      timestamp: req.query.timestamp
    }
  }).then(function (result) {
    if (!result) {
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
    } else {
      return res.jsonp({status: 1003, msg: MESSAGE.CODE_ERROR});
    }
  });
});

router.get('/update_face', function (req, res, next) {
  if (req.query.uid == null
    || req.query.token == null
    || req.query.timestamp == null
    || req.query.face == null) {
    return res.jsonp({status: 1000, msg: MESSAGE.PARAMETER_ERROR})
  }
  UserModel.update({
    face: req.query.face
  }, {
    where: {
      id: req.query.uid
    }
  }).then(function () {
    UserModel.findOne({
      where: {
        id: req.query.uid
      }
    }).then(function (user) {
      return res.jsonp({status: 0, user: user, msg: MESSAGE.SUCCESS})
    });
  })
});

module.exports = router;
