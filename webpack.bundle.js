const webpack = require('webpack')
const path = require('path')

const config = {
  target: 'web',
  node: {
    fs: 'empty'
  },
  entry: './index',
  output: {
    path: path.resolve(__dirname),
    filename: 'locomotor-min.js',
    library: 'locomotor',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['*', '.js'],
    alias: {
      locomotor: path.resolve(__dirname, './locomotor')
    }
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
}

module.exports = config