const { merge } = require("webpack-merge");
const base = require("./webpack.config.base.js");

module.exports = merge(base, {
  mode: "development",
  output: { filename: "dev.bundle.js" },
  devtool: "inline-source-map",
});
