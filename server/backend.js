var mongodb = require('mongodb')
  , mongoose = require('mongoose')
  , findOrCreate = require('mongoose-findorcreate')
  , async = require('async')
;

var fake_posts = [
  {
    id: '4',
    title: 'fuck willie',
    place: 'hi',
    idea: 'wut',
    labor: '10',
    audience: 'tom',
    result: 'derp',
    spend: 'everything',
    story: 'i fuck bitches and get money',
  },
  {
    id: '5',
    title: 'Money over Bitches',
    place: 'Your mamas house',
    idea: 'Stick it in me',
    labor: '10',
    audience: 'Tom',
    result: 'Bitches want me more',
    spend: 'Free',
    story: 'i fuck bitches and get money',
  },
  {
    id: '6',
    title: 'fuck willie',
    place: 'hi',
    idea: 'wut',
    labor: '10',
    audience: 'tom',
    result: 'derp',
    spend: 'everything',
    story: 'i fuck bitches and get money',
  },
  {
    id: '7',
    title: 'Money over Bitches',
    place: 'Your mamas house',
    idea: 'Stick it in me',
    labor: '10',
    audience: 'Tom',
    result: 'Bitches want me more',
    spend: 'Free',
    story: 'i fuck bitches and get money',
  }
];

var backend = {
  fake_posts: fake_posts,

  addPost: (function () {
    var nextPostID = 8; // hack, will go away when actually using mongo
    return function(postData, callback) {
      var postID = nextPostID++;
      postData['id'] = postID.toString();
      fake_posts.push(postData);
      callback(null, {id: postID});
    };
  })(),

  initialize: function (callback) {
    async.waterfall([
      this._connect.bind(this),
      this._initModels.bind(this),
    ], callback);
  },

  _connect: function(callback) {
    // set up mongodb connection
    uri = 'mongodb://localhost/test';
    mongoose.connect(uri);
    var db = mongoose.connection;
    db.on('error', function(error) {
      console.error('connection error: ' + error);
      callback(error);
    });
    db.once('open', function() {
      console.log('Connected to DB');
      callback(null, db);
    });
  },

  _initUserModel: function(db, callback) {
    // user schema
    var userSchema = mongoose.Schema({
      twitter_id: { type: String, required: true, unique: true },
      name: { type: String, required: true },
      image_url: { type: String, required: false},
    });

    userSchema.plugin(findOrCreate);
    var User = mongoose.model('User', userSchema);
    callback(null, User);
  },

  _initPostModel: function(db, callback) {
    // post schema
    var postSchema = mongoose.Schema({
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
      },
      title: { type: String, required: true, unique: true },
      place: { type: String, required: true },
      idea: { type: String, required: true },
      link: { type: String, required: true },
      labor: { type: Number, required: true },
      audience: { type: String, required: true },
      result: { type: String, required: true },
      spend: { type: Number, required: true },
    });

    postSchema.plugin(findOrCreate);
    var Post = mongoose.model('Post', postSchema);
    callback(null, Post);
  },

  _initModels: function(db, callback) {
    var backend = this;
    async.parallel({
      user: function(callback) {
        backend._initUserModel(db, callback);
      },
      post: function(callback) {
        backend._initPostModel(db, callback);
      },
    }, function(err, models) {
      if (err) {
        callback(err);
      } else {
        backend.user = models.user;
        backend.post = models.post;
        callback(null);
      }
    });
  },

};

module.exports = backend;
