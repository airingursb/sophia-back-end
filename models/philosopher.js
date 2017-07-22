/**
 * Created by airing on 2017/3/3.
 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'philosopher',
    {
      'name': {
        'type': DataTypes.STRING(45),
        'allowNull': false
      },
      'englishname': {
        'type': DataTypes.STRING(125),
        'allowNull': true
      },
      'mainidea': {
        'type': DataTypes.STRING(45),
        'allowNull': true
      },
      'avatar': {
        'type': DataTypes.STRING(1000),
        'allowNull': true
      },
      'place': {
        'type': DataTypes.STRING(20),
        'allowNull': true
      },
      'time': {
        'type': DataTypes.STRING(45),
        'allowNull': true
      },
      'wiki': {
        'type': DataTypes.STRING(125),
        'allowNull': true
      },
      'introduce': {
        'type': DataTypes.TEXT,
        'allowNull': true
      },
      'contributor': {
        'type': DataTypes.TEXT,
        'allowNull': true
      },
      'tags': {
        'type': DataTypes.TEXT,
        'allowNull': true
      },
      'createdAt': {
        'type': DataTypes.DOUBLE,
        'allowNull': true
      }
    }
  );
}
