var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
var md5 = require('md5');

var UserModel = require('../models').User;
var PhilosopherModel = require('../models').Philosopher;
var CommentModel = require('../models').Comment;
var WorkModel = require('../models').Work;
var PaperModel = require('../models').Paper;
var DataModel = require('../models').Data;
var IdeaModel = require('../models').Idea;

var MESSAGE = require('./config').MESSAGE;

router.get('/show_list', function (req, res, next) {

  PhilosopherModel.findAll().then(function (results) {

    var philosophers = [];
    results.forEach(function (result) {
      var philosopher = {};
      philosopher.pid = result.id;
      philosopher.avatar = result.avatar;
      philosopher.name = result.name;
      philosophers.push(philosopher)
    });

    return res.jsonp({status: 0, data: philosophers, msg: MESSAGE.SUCCESS});
  });
});

router.get('/show_detail', function (req, res, next) {

  if (req.query.uid == null
    || req.query.token == null
    || req.query.timestamp == null
    || req.query.pid == null) {
    return res.jsonp({status: 1000, msg: MESSAGE.PARAMETER_ERROR})
  }

  PhilosopherModel.findOne({
    where: {
      id: req.query.pid
    },
    include: [CommentModel, PaperModel, WorkModel, DataModel, IdeaModel]
  }).then(function (philosopher) {
    return res.jsonp({status: 0, data: philosopher, msg: MESSAGE.SUCCESS});
  });
});

router.get('/add_philosopher', function (req, res, next) {

  if (req.query.uid == null
    || req.query.token == null
    || req.query.timestamp == null
    || req.query.name == null) {
    return res.jsonp({status: 1000, msg: MESSAGE.PARAMETER_ERROR})
  }

  var philosopher = {
    name: req.query.name,
    englishname: req.query.englishname ? req.query.englishname : '',
    mainidea: req.query.mainidea ? req.query.mainidea : '',
    avatar: req.query.avatar ? req.query.avatar : '',
    place: req.query.place ? req.query.place : '',
    time: req.query.time ? req.query.time : '',
    wiki: req.query.wiki ? req.query.wiki : '',
    introduce: req.query.introduce ? req.query.introduce : '',
    createdAt: new Date().getTime()
  };

  PhilosopherModel.create(philosopher).then(function (philosopher) {
    return res.jsonp({status: 0, data: philosopher, msg: MESSAGE.SUCCESS});
  });
});

router.get('/add_comment', function (req, res, next) {

  var timestamp = new Date().getTime();

  if (req.query.uid == null
    || req.query.token == null
    || req.query.timestamp == null
    || req.query.pid == null
    || req.query.msg == null) {
    return res.jsonp({status: 1000, msg: MESSAGE.PARAMETER_ERROR})
  }

  var comment = {
    uid: req.query.uid,
    philosopherId: req.query.pid,
    username: req.query.username ? req.query.username : '',
    face_url: req.query.face_url ? req.query.face_url : '',
    msg: req.query.msg ? req.query.msg : '',
    philosopher: {},
    user: {},
    createdAt: timestamp
  };

  UserModel.findOne({
    where: {
      id: req.query.uid
    }
  }).then(function (user) {
    comment.user = user;
    comment.username = user.username;
    comment.face_url = user.face_url;

    PhilosopherModel.findOne({
      where: {
        id: req.query.pid
      }
    }).then(function (philosopher) {
      comment.philosopher = philosopher;
      CommentModel.create(comment).then(function (result) {
        return res.jsonp({status: 0, data: result, msg: MESSAGE.SUCCESS});
      })
    })
  });
});

router.get('/add_paper', function (req, res, next) {

  var timestamp = new Date().getTime();

  if (req.query.uid == null
    || req.query.token == null
    || req.query.timestamp == null
    || req.query.pid == null
    || req.query.papername == null) {
    return res.jsonp({status: 1000, msg: MESSAGE.PARAMETER_ERROR})
  }

  var paper = {
    uid: req.query.uid,
    philosopherId: req.query.pid,
    username: req.query.username ? req.query.username : '',
    face_url: req.query.face_url ? req.query.face_url : '',
    papername: req.query.papername ? req.query.papername : '',
    paperurl: req.query.paperurl ? req.query.paperurl : '',
    author: req.query.author ? req.query.author : '',
    rating: req.query.rating ? req.query.rating : '',
    philosopher: {},
    user: {},
    createdAt: timestamp
  };

  UserModel.findOne({
    where: {
      id: req.query.uid
    }
  }).then(function (user) {
    paper.user = user;
    paper.username = user.username;
    paper.face_url = user.face_url;

    PhilosopherModel.findOne({
      where: {
        id: req.query.pid
      }
    }).then(function (philosopher) {
      paper.philosopher = philosopher;
      PaperModel.create(paper).then(function (result) {
        return res.jsonp({status: 0, data: result, msg: MESSAGE.SUCCESS});
      })
    })
  });
});

router.get('/add_works', function (req, res, next) {

  var timestamp = new Date().getTime();

  if (req.query.uid == null
    || req.query.token == null
    || req.query.timestamp == null
    || req.query.pid == null
    || req.query.worksname == null) {
    return res.jsonp({status: 1000, msg: MESSAGE.PARAMETER_ERROR})
  }

  var works = {
    uid: req.query.uid,
    philosopherId: req.query.pid,
    username: req.query.username ? req.query.username : '',
    face_url: req.query.face_url ? req.query.face_url : '',
    worksname: req.query.worksname ? req.query.worksname : '',
    worksurl: req.query.worksurl ? req.query.worksurl : '',
    rating: req.query.rating ? req.query.rating : '',
    philosopher: {},
    user: {},
    createdAt: timestamp
  };

  UserModel.findOne({
    where: {
      id: req.query.uid
    }
  }).then(function (user) {
    works.user = user;
    works.username = user.username;
    works.face_url = user.face_url;

    PhilosopherModel.findOne({
      where: {
        id: req.query.pid
      }
    }).then(function (philosopher) {
      works.philosopher = philosopher;
      WorkModel.create(works).then(function (result) {
        return res.jsonp({status: 0, data: result, msg: MESSAGE.SUCCESS});
      })
    })
  });
});

router.get('/add_data', function (req, res, next) {

  var timestamp = new Date().getTime();

  if (req.query.uid == null
    || req.query.token == null
    || req.query.timestamp == null
    || req.query.pid == null
    || req.query.name == null) {
    return res.jsonp({status: 1000, msg: MESSAGE.PARAMETER_ERROR})
  }

  var data = {
    uid: req.query.uid,
    philosopherId: req.query.pid,
    username: req.query.username ? req.query.username : '',
    face_url: req.query.face_url ? req.query.face_url : '',
    name: req.query.name ? req.query.name : '',
    url: req.query.url ? req.query.url : '',
    rating: req.query.rating ? req.query.rating : '',
    philosopher: {},
    user: {},
    createdAt: timestamp
  };

  UserModel.findOne({
    where: {
      id: req.query.uid
    }
  }).then(function (user) {
    data.user = user;
    data.username = user.username;
    data.face_url = user.face_url;

    PhilosopherModel.findOne({
      where: {
        id: req.query.pid
      }
    }).then(function (philosopher) {
      data.philosopher = philosopher;
      DataModel.create(data).then(function (result) {
        return res.jsonp({status: 0, data: result, msg: MESSAGE.SUCCESS});
      })
    })
  });
});

router.get('/add_idea', function (req, res, next) {

  var timestamp = new Date().getTime();

  if (req.query.uid == null
    || req.query.token == null
    || req.query.timestamp == null
    || req.query.pid == null
    || req.query.content == null) {
    return res.jsonp({status: 1000, msg: MESSAGE.PARAMETER_ERROR})
  }

  var idea = {
    uid: req.query.uid,
    philosopherId: req.query.pid,
    username: req.query.username ? req.query.username : '',
    face_url: req.query.face_url ? req.query.face_url : '',
    content: req.query.content ? req.query.content : '',
    frombook: req.query.frombook ? req.query.frombook : '',
    frompaper: req.query.frompaper ? req.query.frompaper : '',
    rating: req.query.rating ? req.query.rating : '',
    philosopher: {},
    user: {},
    createdAt: timestamp
  };

  UserModel.findOne({
    where: {
      id: req.query.uid
    }
  }).then(function (user) {
    idea.user = user;
    idea.username = user.username;
    idea.face_url = user.face_url;

    PhilosopherModel.findOne({
      where: {
        id: req.query.pid
      }
    }).then(function (philosopher) {
      idea.philosopher = philosopher;
      IdeaModel.create(idea).then(function (result) {
        return res.jsonp({status: 0, data: result, msg: MESSAGE.SUCCESS});
      })
    })
  });
});

router.get('/search', function (req, res, next) {

  var timestamp = new Date().getTime();

  if (req.query.search == null) {
    return res.jsonp({status: 1000, msg: MESSAGE.PARAMETER_ERROR})
  }

  PhilosopherModel.findAll({
    where: {
      name: {
        '$like': '%' + req.query.search + '%'
      }
    }
  }).then(function (results) {
    var philosophers = [];
    results.forEach(function (result) {
      var philosopher = {};
      philosopher.pid = result.id;
      philosopher.avatar = result.avatar;
      philosopher.name = result.name;
      philosophers.push(philosopher)
    });
    return res.jsonp({status: 0, data: philosophers, msg: MESSAGE.SUCCESS});
  })

});

module.exports = router;
