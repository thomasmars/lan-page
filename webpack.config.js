var path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'babel',
      },
      {
        test: /\.html$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'file?name=[name].[ext]'
      }
    ]
  },
  devtool: 'sourcemaps'
};
