'use strict';

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname, "src"),
  entry: {
    app: './NavigationBarOnTop.js',
  },

  resolve: {
    extensions: [
      ".js", ".yml"
    ],
    alias: {
      components: path.resolve(__dirname, "src/components"),
      store: path.resolve(__dirname, "src/store"),
    },
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: "Share Idle Items",
      template: './index.hbs',
      chunks: ['app'],
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: "babel-loader",
        options: {
          presets: ["es2015", "stage-0", "react"],
          plugins: ["transform-decorators-legacy", "transform-runtime"],
        }
      }]
    }, {
      test: /\.yml$/,
      exclude: /node_modules/,
      use: [{
        loader: "json-loader",
      }, {
        loader: "yaml-loader",
      }],
    }, {
      test: /\.(jpe?g|png|gif|mp3)$/i,
      exclude: /node_modules/,
      loaders: ['file-loader']
    },
    ]
  }
};