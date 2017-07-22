module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'comment',
    {
      'uid': {
        'type': DataTypes.INTEGER,
        'allowNull': false
      },
      'userId': {
        'type': DataTypes.INTEGER,
        'allowNull': true
      },
      'username': {
        'type': DataTypes.STRING(45),
        'allowNull': false
      },
      'philosopherId': {
        'type': DataTypes.INTEGER,
        'allowNull': false
      },
      'msg': {
        'type': DataTypes.TEXT,
        'allowNull': false
      },
      'face_url': {
        'type': DataTypes.STRING(125),
        'allowNull': false
      },
      'createdAt': {
        'type': DataTypes.DOUBLE,
        'allowNull': true
      }
    },
    {
      indexes: [
        {
          name: 'philosopher_id',
          method: 'BTREE',
          fields: ['philosopherId']
        },
        {
          name: 'user_id',
          method: 'BTREE',
          fields: ['userId']
        }
      ]
    }
  );
};

