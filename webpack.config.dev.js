const path = require('path');
const base = require('./webpack.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ip = require('ip');
module.exports = Object.assign({}, base, {
  mode: 'development',
  devtool: 'cheap-source-map',
  devServer: {
    port: 10001,
    host: ip.address() || '127.0.0.1',
    contentBase: path.join(__dirname, 'public'),
    // compress: true,开启gzip压缩
    // progress: true, 显示打包的进度
    inline: true,
    historyApiFallback: true,
    publicPath: '/assets/',
    hot: true,
    liveReload: false,
    // https: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
