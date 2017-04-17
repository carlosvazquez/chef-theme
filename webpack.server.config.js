'use strict';

var webpack = require('webpack');
var path = require('path');
var WebpackShellPlugin = require('webpack-shell-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackUglifyJsPlugin = require('webpack-uglify-js-plugin');

module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'assets/[name].js',
    publicPath: '/assets/'
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    host: "localhost",
    inline: false,
    port: 9000,
    stats: 'errors-only',
    filename: "app.js"
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
  externals: {
    jquery: 'jQuery',
    slick: 'slick-carousel'
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new ExtractTextPlugin('assets/styles.css'),
    new CopyWebpackPlugin([
      { from: './src/html/home.twig', to: 'home.html' }
      ], { copyUnmodified: false }),
    new WebpackShellPlugin({
      onBuildStart: ['node convert-twig-params.js'],
      onBuildEnd: ['node convert-twig-params.js'],
      onBuildExit: ['node convert-twig-params.js']
    })
  ]
}
