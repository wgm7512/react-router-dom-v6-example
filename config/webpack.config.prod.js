const { merge } = require('webpack-merge');
const webpackConfigBase = require('./webpack.config.base.js');

const webpackConfigProd = {
  mode: 'production'
}

module.exports = merge(webpackConfigBase, webpackConfigProd);