'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('./public'),
    publicPath: '/public/',
    filename: 'application.js'
  },
  module: {
    loaders: [
      {test: /\.html$/, loader: 'html'},
      {test: /\.sass$/, loader: 'style!css!sass?indentedSyntax'},
      {test: /\.png$/,  loader: 'url-loader?limit=10000' },
    ]
  },
  //plugins: [
    //new webpack.optimize.UglifyJsPlugin({minimize: true})
  //]
};

