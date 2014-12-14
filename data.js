var user = {
  is_authenticated: false
};

var posts = [
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

var data = {
  main: {
    user: user,
    posts: posts
  },
  view: {
    post_data: posts[0]
  }
}

module.exports = data;
