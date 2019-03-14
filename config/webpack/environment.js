const {environment} = require('@rails/webpacker');
const webpack = require('webpack');

environment.plugins.prepend('Provide', new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery'
}));

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

module.exports = environment;
