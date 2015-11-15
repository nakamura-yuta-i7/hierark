var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
	entry: {
		main: './src/web/app.js',
	},
	output: {
		path: __dirname + "/public",
		filename: "javascripts/[name].js",
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: "babel-loader?presets[]=es2015",
			},
			{ test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192' },
			{ test: /\.jade$/, loader: "jade" },
			{ test: /\.scss$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader") },
			{ test: /\.css$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
			{ test: /\.less$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader") },
		]
	},
	devtool: 'inline-source-map',
	plugins: [
		new ExtractTextPlugin("stylesheets/[name].css"),
		new CommonsChunkPlugin('javascripts/init.js'),
		// new uglifyJsPlugin({ compress: { warnings: false } }),
		// new webpack.ProvidePlugin({
		// 	$: "jquery",
		// 	jQuery: "jquery",
		// 	"window.jQuery": "jquery"
		// })
	],
	externals: {
		// require('data') is external and available
		//  on the global var data
		//'jquery': '$',
	}
};
