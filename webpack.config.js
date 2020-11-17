const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname + '/build'),
    filename: '[name]/[name].js',
    publicPath: '/assets/',
    chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use:[
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader', //MiniCssExtractPlugin.loader,
          },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: require('./config/postcss.config'),
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader', // MiniCssExtractPlugin.loader,
          },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: require('./config/postcss.config'),
          },
          { loader: 'sass-loader'},
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'imgs/[name].[hash:8].[ext]',
        },
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[hash:8].[ext]',
        },
      }
    ]
  },
  externals:{react: 'React','react-dom': 'ReactDOM', jQuery: 'jQuery'},
  resolve: {
    extensions: ['.js','.jsx','.ts','.tsx'],
    alias: {
      '@': path.resolve(process.cwd(), 'src')
    }
  },
  
  plugins:  [
    // new MiniCssExtractPlugin({
    //   filename: 'css/[name].[contenthash:8].css',
    //   chunkFilename: 'css/[name].[contenthash:8].chunk.css',
    // }),
    // new OptimizeCSSAssetsPlugin(),
  ]
}