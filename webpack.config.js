var path = require('path');
module.exports = {
  entry: './client/scripts/index.react.js',
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'public/js')
  },
  module: {
    loaders: [{
      test: /\.react.js$/,
      loader: 'jsx-loader?insertPragma=React.DOM&harmony'
    }]
  }
}
