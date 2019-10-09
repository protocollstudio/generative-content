/*
* @Author: OMAO
* @Date:   2019-09-19 23:18:38
* @Last Modified by:   OMAO
* @Last Modified time: 2019-09-20 15:00:22
*/

var path = require("path");

module.exports = {
  // context: __dirname + "/src",
	entry: "./app.js",
  output: {
    path: path.resolve(__dirname),
    filename: "bundle.js"
  },
  mode: "development",
  watch: true,
  devtool: "source-map",
  resolve: {
    alias: {
      Sketches: path.resolve(__dirname, 'src/sketches/'),
      Modules: path.resolve(__dirname, 'modules/'),
      Node: path.resolve(__dirname, 'node_modules/'),
      Assets: path.resolve(__dirname, 'assets/')
    }
  }
};
