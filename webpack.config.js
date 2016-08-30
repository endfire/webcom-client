const webpack = require('webpack');
const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: `${__dirname}/src/index.js`,
  output: {
    path: `${__dirname}/build`,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: [
      path.resolve(__dirname, './src'),
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new ExtractTextPlugin('bundle.css'),
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
        // loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
        loader: 'style!css',
      },
      {
        test: /\.scss$/,
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'resolve-url',
          'sass?sourceMap&includePaths[]=node_modules',
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
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
