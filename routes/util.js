var express = require('express');
var router = express.Router();
var qiniu = require('qiniu');
var https = require('https');
var querystring = require('querystring');

var QINIU_ACCESS = require('./config').QINIU_ACCESS;
var QINIU_SECRET = require('./config').QINIU_SECRET;
var BUCKET = require('./config').BUCKET;
var MESSAGE = require('./config').MESSAGE;
var ADMIN_USER = require('./config').ADMIN_USER;
var ADMIN_PASSWORD = require('./config').ADMIN_PASSWORD;
var YUNPIAN_APIKEY = require('./config').YUNPIAN_APIKEY;

var UserModel = require('../models').User;
var CodeModel = require('../models').Code;
var VersionModel = require('../models').Version;

qiniu.conf.ACCESS_KEY = QINIU_ACCESS;
qiniu.conf.SECRET_KEY = QINIU_SECRET;

router.post('/upload', function (req, res, next) {
  var form = new multiparty.Form({uploadDir: './public/files/'});
  form.parse(req, function (err, fields, files) {
    var filesTmp = JSON.stringify(files, null, 2);
    if (err) {
      console.log('parse error: ' + err);
    } else {
      console.log('parse files: ' + filesTmp);
      var inputFile = files.inputFile[0];
      var uploadedPath = inputFile.path;
      var dstPath = './public/files/' + inputFile.originalFilename;
      fs.rename(uploadedPath, dstPath, function (err) {
        if (err) {
          console.log('rename error: ' + err);
        } else {
          console.log('rename ok');
        }
      });
    }

    res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
    res.write('received upload:\n\n');
    res.end(util.inspect({fields: fields, files: filesTmp}));
  });
});

function uptoken(bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
  return putPolicy.token();
}

router.get('/qiniu_token', function (req, res, next) {

  if (req.query.token == null || req.query.uid == null || req.query.timestamp == null || req.query.filename == null) {
    return res.jsonp({status: 1000, msg: MESSAGE.PARAMETER_ERROR})
  }
  var qiniu_token = uptoken(BUCKET, req.query.filename);
  return res.jsonp({status: 0, qiniu_token: qiniu_token, msg: MESSAGE.SUCCESS});
});

router.get('/code', function (req, res, next) {

  var timestamp = new Date().getTime();
  if (req.query.timestamp == null || req.query.phonenumber == null) {
    return res.jsonp({status: 1000, msg: MESSAGE.PARAMETER_ERROR})
  }
  var code = Math.floor(Math.random() * 899999 + 100000);

  var postData = {
    mobile: req.query.phonenumber,
    text: '【双生APP】您的验证码是' + code,
    apikey: YUNPIAN_APIKEY
  };

  var content = querystring.stringify(postData);

  var options = {
    host: 'sms.yunpian.com',
    path: '/v2/sms/single_send.json',
    method: 'POST',
    agent: false,
    rejectUnauthorized: false,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': content.length
    }
  };

  var model = {
    user_account: req.query.phonenumber,
    code: code,
    timestamp: timestamp,
    used: false
  };

  CodeModel.findAll({
    where: {
      user_account: req.query.phonenumber,
      used: false
    }
  }).then(function (results) {
    if (results[0] !== undefined) {
      console.log('连续请求:' + (timestamp - results[0].timestamp));
      if (timestamp - results[0].timestamp < 600000) {
        return res.jsonp({status: 5000, msg: MESSAGE.REQUEST_ERROR});
      }
    }
    CodeModel.create(model).then(function () {

      var req = https.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
          console.log(JSON.parse(chunk));
        });
        res.on('end', function () {
          console.log('over');
        });
      });
      req.write(content);
      req.end();
    });

    return res.jsonp({status: 0, msg: MESSAGE.SUCCESS, data: code});
  });
});

module.exports = router;
