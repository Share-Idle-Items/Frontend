const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    proxy: {
      '/api': 'http://lovesykun.cn:8080',
    }
  }
});