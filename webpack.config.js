
var path = require("path");

module.exports = {
  // context: __dirname + "/src",
	entry: "./app.js",
  output: {
    path: path.resolve(__dirname, "public"),
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

// module.exports = {
// 	entry: './js/app.js',
// 	output: {
// 		filename: 'app.js',
// 		path: path.resolve(__dirname, 'public')
// 	},
// 	devServer: {
// 		contentBase: './public'
//   },
//   devtool: "source-map",
// 	module: {
// 		rules: [
// 			{
// 				test: /\.(js|jsx)$/,
// 				exclude: /node_modules/,
// 				use: {
// 					loader: 'babel-loader'
// 				}
// 			}
// 		]
//   }
// };
