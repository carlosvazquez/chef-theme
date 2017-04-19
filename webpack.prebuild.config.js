'use strict';

var webpack = require('webpack');
var path = require('path');
var WebpackShellPlugin = require('webpack-shell-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackUglifyJsPlugin = require('webpack-uglify-js-plugin');

module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/[name].js',
  },

  module: {
    rules: [
    {
      test: /\.(js)$/,
      loader: 'babel-loader',
      exclude: /node_module/,
      query: {
        presets: ['es2015']
      }
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('css-loader!sass-loader')
    },
    {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('css-loader!less-loader')
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('css-loader')
    },
    {
      test: /\.exec.js$/,
      use: [ 'script-loader' ]
    }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new ExtractTextPlugin('assets/styles.css.twig'),
    new CopyWebpackPlugin([
      { from: './src/pages/', to: 'pages' },
      { from: './src/images/', to: 'images' },
      { from: './src/assets/', to: 'assets' }
      ], 
      {ignore: [
        // Doesn't copy any files with a scss extension    
        '*.scss',
        'components',
        'components/*.scss'
      ]},
      { copyUnmodified: false }),
    new WebpackShellPlugin({
      onBuildEnd: ['node convert-twig-params.js']
    })
  ]
}
