const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
    ]
  },
  //TODO For production and use a minified version uncomment the lines below:
 /*  
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],
  */
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
