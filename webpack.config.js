const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  target: 'node',
  resolve: { extensions: ['.ts'] },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  externals: [nodeExternals()],
};
