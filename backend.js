var mongodb = require('mongodb')
  , mongoose = require('mongoose')
  , findOrCreate = require('mongoose-findorcreate')
  , async = require('async');

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
  }
];

var backend = {
  fake_posts: fake_posts,

  initialize: function (callback) {
    var backend = this;
    async.waterfall([
      this._connect,
      this._userSchema,
    ], function(err, result) {
      backend.User = result;
      if (err) { callback(err); }
      else { callback(null); }
    });
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

  _userSchema :function(db, callback) {
    // user schema
    var userSchema = mongoose.Schema({
      twitter_id: { type: String, required: true, unique: true },
      name: { type: String, required: true, unique: true },
      image_url: { type: String, required: false},
    });

    userSchema.plugin(findOrCreate);
    var User = mongoose.model('User', userSchema);
    callback(null, User);
  }
};

module.exports = backend;
