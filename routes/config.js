const MESSAGE = {
  SUCCESS: '请求成功',   // 0
  PARAMETER_ERROR: '参数错误',   // 1000
  USER_NOT_EXIST: '用户不存在',   // 1002
  PASSWORD_ERROR: '账号密码错误',  // 1003
  CODE_ERROR: '验证码错误', // 1004
  USER_ALREADY_EXIST: '用户已被注册', // 1005
  USER_ALREADY_CONNECT: '用户已被匹配', //
  USER_ALREADY_LOGIN: '用户已被登录', // 1017
  USER_NOT_LOGIN: '用户尚未登录', //
  TYPE_ERROR: 'type参数有误', // 1001
  PICTURE_IS_NULL: '图片为空', // 1002
  VIDEO_IS_NULL: '视频为空', // 1003
  MOMENT_IS_NULL: '附近没有阅圈', // 4000
  REQUEST_ERROR: '请求时间间隔过短', // 5000
  FOLLOWER_IS_EXISE: '已经存在该粉丝', // 5001
};

const KEY = '';
const SQL_PASSWORD = '';
const YUNPIAN_APIKEY = '';
const QINIU_ACCESS = '';
const QINIU_SECRET = '';
const BUCKET = '';
const ADMIN_USER = '';
const ADMIN_PASSWORD = '';

var JPush = require('jpush-sdk');
var client = JPush.buildClient('', '');

function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  var strHours = date.getHours();
  var strMinutes = date.getMinutes();
  var strSeconds = date.getSeconds();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  if (strHours >= 0 && strHours <= 9) {
    strHours = "0" + strHours;
  }
  if (strMinutes >= 0 && strMinutes <= 9) {
    strMinutes = "0" + strMinutes;
  }
  if (strSeconds >= 0 && strSeconds <= 9) {
    strSeconds = "0" + strSeconds;
  }
  var currentDate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    + 'T' + strHours + seperator2 + strMinutes
    + seperator2 + strSeconds + '.000Z';
  return currentDate;
}

function LantitudeLongitudeDist(lon1, lat1, lon2, lat2) {
  var EARTH_RADIUS = 6378137;
  var radLat1 = lat1 * Math.PI / 180.0;
  var radLat2 = lat2 * Math.PI / 180.0;

  var radLon1 = lon1 * Math.PI / 180.0;
  var radLon2 = lon2 * Math.PI / 180.0;

  if (radLat1 < 0)
    radLat1 = Math.PI / 2 + Math.abs(radLat1);// south
  if (radLat1 > 0)
    radLat1 = Math.PI / 2 - Math.abs(radLat1);// north
  if (radLon1 < 0)
    radLon1 = Math.PI * 2 - Math.abs(radLon1);// west
  if (radLat2 < 0)
    radLat2 = Math.PI / 2 + Math.abs(radLat2);// south
  if (radLat2 > 0)
    radLat2 = Math.PI / 2 - Math.abs(radLat2);// north
  if (radLon2 < 0)
    radLon2 = Math.PI * 2 - Math.abs(radLon2);// west
  var x1 = EARTH_RADIUS * Math.cos(radLon1) * Math.sin(radLat1);
  var y1 = EARTH_RADIUS * Math.sin(radLon1) * Math.sin(radLat1);
  var z1 = EARTH_RADIUS * Math.cos(radLat1);

  var x2 = EARTH_RADIUS * Math.cos(radLon2) * Math.sin(radLat2);
  var y2 = EARTH_RADIUS * Math.sin(radLon2) * Math.sin(radLat2);
  var z2 = EARTH_RADIUS * Math.cos(radLat2);

  var d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) + (z1 - z2) * (z1 - z2));
  //余弦定理求夹角
  var theta = Math.acos((EARTH_RADIUS * EARTH_RADIUS + EARTH_RADIUS * EARTH_RADIUS - d * d) / (2 * EARTH_RADIUS * EARTH_RADIUS));
  var dist = theta * EARTH_RADIUS;
  return dist.toFixed(3) + 'km';
}

var log = function (api) {
  console.log('POST: ' + api);
  console.log('TIME: ' + getNowFormatDate());
};

function JiGuangPush(user_id) {
  client.push().setPlatform('ios', 'android')
    .setAudience(JPush.alias(user_id.toString()))
    .setNotification('骑阅通知', JPush.ios('ios alert'), JPush.android('android alert', null, 1))
    .setMessage('您有一条未读动态！')
    .setOptions(null, 60)
    .send(function (err, res) {
      if (err) {
        if (err instanceof JPush.APIConnectionError) {
          console.log(err.message);
          // Response Timeout means your request to the server may have already received,
          // please check whether or not to push
          console.log(err.isResponseTimeout)
        } else if (err instanceof JPush.APIRequestError) {
          console.log(err.message)
        }
      } else {
        console.log('Sendno: ' + res.sendno);
        console.log('Msg_id: ' + res.msg_id);
      }
    })
}

exports.JiGuangPush = JiGuangPush;
exports.MESSAGE = MESSAGE;
exports.KEY = KEY;
exports.SQL_PASSWORD = SQL_PASSWORD;
exports.YUNPIAN_APIKEY = YUNPIAN_APIKEY;
exports.QINIU_ACCESS = QINIU_ACCESS;
exports.QINIU_SECRET = QINIU_SECRET;
exports.ADMIN_USER = ADMIN_USER;
exports.ADMIN_PASSWORD = ADMIN_PASSWORD;
exports.BUCKET = BUCKET;
exports.log = log;
exports.LantitudeLongitudeDist = LantitudeLongitudeDist;