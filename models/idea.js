module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'idea',
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
      'face_url': {
        'type': DataTypes.STRING(125),
        'allowNull': false
      },
      'philosopherId': {
        'type': DataTypes.INTEGER,
        'allowNull': false
      },
      'content': {
        'type': DataTypes.STRING(500),
        'allowNull': false
      },
      'frombook': {
        'type': DataTypes.STRING(125),
        'allowNull': true
      },
      'frompaper': {
        'type': DataTypes.STRING(125),
        'allowNull': true
      },
      'rating': {
        'type': DataTypes.DOUBLE,
        'allowNull': true
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

