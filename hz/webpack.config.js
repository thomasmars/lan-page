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
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'style!css?modules',
      },
      {
        test: /\.html$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.(png|jpg)$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'url?limit=25000'
      },
      {
        test: /\.ico$/,
        include: [
          path.resolve(__dirname, 'src/assets')
        ],
        loader: 'file?name=[name].[ext]'
      }
    ]
  },
  devtool: 'sourcemaps',
  devServer: {
    port: 8050,
    contentBase: "./dist",
    quiet: true
  }
};
