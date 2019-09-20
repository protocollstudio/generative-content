/*
* @Author: OMAO
* @Date:   2019-09-19 23:18:38
* @Last Modified by:   OMAO
* @Last Modified time: 2019-09-20 15:00:22
*/

var path = require("path");

module.exports = {
  entry: "./js/sketch.js",
  output: {
    path: path.resolve(__dirname),
    filename: "bundle.js"
  },
  mode: "development"
};
