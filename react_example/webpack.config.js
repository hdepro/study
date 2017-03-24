var path = require('path');
var webpack = require('webpack');
var historyApiFallback = require('connect-history-api-fallback');
var node_modules = path.resolve('../', 'node_modules');
var path_React = path.resolve(node_modules, 'react/dist/react.min.js');
var path_ReactDOM = path.resolve(node_modules, 'react-dom/dist/react-dom.min.js');
var path_ReactRouter = path.resolve(node_modules, 'react-router/umd/ReactRouter.min.js');
var path_polyfill = path.resolve(node_modules, 'babel-polyfill/dist/polyfill.min.js');

module.exports = {
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        //port:8080
        //host:'0.0.0.0',
        //proxy: {
        //  '/commander/*': {
        //    //target: 'http://10.1.29.250:30175',
        //    target: 'http://localhost:9000',
        //    secure: false
        //  }
        //},
    },
    entry:{
        setState:'./javascript/setState.js'
    },
  resolve: {
    alias: {
      'react': path_React,
      'react-router':path_ReactRouter,
      'babel-polyfill':path_polyfill,
      'react-dom': path_ReactDOM
    },
    extensions: ['.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].js',
    publicPath: 'http://localhost:8080'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js/,
        loaders: ['babel-loader' ],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.jsx$/,
        loaders: ['react-hot-loader' ,'babel-loader' ],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test:/\.scss$/,
        loaders:['style-loader','css-loader','sass-loader'],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  }
};






