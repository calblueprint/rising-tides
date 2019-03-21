const { environment } = require("@rails/webpacker");

const webpack = require("webpack");

environment.plugins.prepend(
  "Provide",
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
  })
);

environment.loaders.prepend("babel-loader", {
  test: /\.jsx$|\.js$/,
  exclude: /node_modules/,
  use: [{ loader: "babel-loader" }]
});

module.exports = environment;
