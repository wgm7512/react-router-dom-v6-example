const { merge } = require('webpack-merge');
const webpackConfigBase = require('./webpack.config.base.js');
const path = require('path');

// 优化输出日志
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const host = 'localhost';
const port = 3304;

const webpackConfigDev = {
  mode: 'development', // 如果没有手动的设置 NODE_ENV ，在执行 webpack 后，会将 mode 同步到 NODE_ENV 中
  stats: "none",
  devServer: {
    port,
    host,
    hot: true,
    open: true,
    historyApiFallback:{
      disableDotRule: true
    }
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`You application is running here http://${host}:${port}`],
      },
      clearConsole: true
    })
  ]
}

module.exports = merge(webpackConfigBase, webpackConfigDev);