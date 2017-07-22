/**
 * Created by airing on 2017/3/3.
 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'user',
    {
      'username': {
        'type': DataTypes.STRING(45),
        'allowNull': false
      },
      'password': {
        'type': DataTypes.STRING(125),
        'allowNull': false
      },
      'sex': {
        'type': DataTypes.INTEGER,
        'allowNull': true
      },
      'school': {
        'type': DataTypes.STRING(45),
        'allowNull': true
      },
      'className': {
        'type': DataTypes.STRING(20),
        'allowNull': true
      },
      'phonenumber': {
        'type': DataTypes.STRING(20),
        'allowNull': true
      },
      'state': {
        'type': DataTypes.STRING(20),
        'allowNull': true
      },
      'createdAt': {
        'type': DataTypes.DOUBLE,
        'allowNull': true
      }
    }
  );
};
