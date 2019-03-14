const {environment} = require('@rails/webpacker');
const webpack = require('webpack');

environment.loaders.prepend('eslint', {
  test: /\.js$/,
  exclude: /node_modules/,
  use: [{loader: 'eslint-loader'}]
})

environment.loaders.prepend('babel-loader', {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: [{loader: 'babel-loader'}]
})

environment.plugins.append('Provide', new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery'
}));

module.exports = environment;
