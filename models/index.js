var sequelize = require('../config/sequelize').sequelize();
var User = sequelize.import('./user');
var Philosopher = sequelize.import('./philosopher');
var Comment = sequelize.import('./comment');
var Paper = sequelize.import('./paper');
var Work = sequelize.import('./work');
var Data = sequelize.import('./data');
var Idea = sequelize.import('./idea');
var Code = sequelize.import('./code');

User.hasMany(Comment, {foreignKey: 'userId', targetKey: 'userId'});
User.hasMany(Paper, {foreignKey: 'userId', targetKey: 'userId'});
User.hasMany(Work, {foreignKey: 'userId', targetKey: 'userId'});
User.hasMany(Data, {foreignKey: 'userId', targetKey: 'userId'});
User.hasMany(Idea, {foreignKey: 'userId', targetKey: 'userId'});

Philosopher.hasMany(Comment, {foreignKey: 'philosopherId', targetKey: 'philosopherId'});
Philosopher.hasMany(Paper, {foreignKey: 'philosopherId', targetKey: 'philosopherId'});
Philosopher.hasMany(Work, {foreignKey: 'philosopherId', targetKey: 'philosopherId'});
Philosopher.hasMany(Data, {foreignKey: 'philosopherId', targetKey: 'philosopherId'});
Philosopher.hasMany(Idea, {foreignKey: 'philosopherId', targetKey: 'philosopherId'});

Comment.belongsTo(Philosopher);
Paper.belongsTo(Philosopher);
Work.belongsTo(Philosopher);
Data.belongsTo(Philosopher);
Idea.belongsTo(Philosopher);

sequelize.sync();

exports.User = User;
exports.Philosopher = Philosopher;
exports.Comment = Comment;
exports.Paper = Paper;
exports.Work = Work;
exports.Data = Data;
exports.Idea = Idea;
exports.Code = Code;
