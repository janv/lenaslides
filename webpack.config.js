'use strict';

var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'public/application.js'
  },
  module: {
    loaders: [
      {test: /\.html$/, loader: 'html'}
    ]
  },
  //plugins: [
    //new webpack.optimize.UglifyJsPlugin({minimize: true})
  //]
};

