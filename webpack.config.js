var path = require('path');
module.exports = {
  entry: './client/scripts/browser.js',
  output: {
    filename: 'browser.js',
    path: path.join(__dirname, 'public/js')
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'jsx-loader?insertPragma=React.DOM&harmony'
    }]
  }
}
