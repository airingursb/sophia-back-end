/**
 * Created by airing on 2017/3/3.
 */
var Sequelize = require('sequelize');
var SQL_PASSWORD = require('../routes/config').SQL_PASSWORD;

exports.sequelize = function () {
  return new Sequelize('philosopher', 'root', SQL_PASSWORD, {'dialect': 'mysql', host: 'localhost', port: 3306});
}
