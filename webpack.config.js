const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: `${__dirname}/src/index.js`,
  output: {
    path: `${__dirname}/build`,
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        include: path.join(__dirname, 'src'),
        loaders: ['react-hot', 'babel'],
      },
      {
        test: /\.css$/,
        loaders: [
          'style?sourceMap',
          'css',
        ],
      },
      {
        test: /\.scss$/,
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'resolve-url',
          'sass?sourceMap',
        ],
      },
    ],
  },
  devServer: {
    host: 'localhost',
    colors: true,
    historyApiFallback: true,
    inline: true,
    port: 3000,
    publicPath: '/build/',
    filename: 'bundle.js',
  },
};
