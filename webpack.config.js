'use strict'

var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var vue = require("vue-loader");

var isProduction = function() {
	return process.env.NODE_ENV === 'production';
}

var cdnPrefix = 'http://www.haimi.com',
	buildPath = '/dist/', ///static/admin/dist/
	publishPath = cdnPrefix + buildPath;

if (isProduction()) {
	cdnPrefix = '';
	publishPath = cdnPrefix + buildPath;
}

module.exports = {
	entry: {
		app: ['zepto', 'fastclick', './src/main.js', './src/assets/css/global.css', './src/assets/js/common.js']
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js",
		chunkFilename: "[id][chunkhash].js",
		publicPath: publishPath
	},
	module: {
		loaders: [{
			test: /\.vue$/,
			loader: 'vue',
		}, {
			test: /\.css$/,
			loader: ExtractTextPlugin.extract("style-loader", "css-loader")
		}, {
			test: /\.js$/,
			exclude: /node_modules|vue\/dist/,
			loader: 'babel'
		}, {
			test: /\.(jpg|png|gif)$/,
			loader: "file-loader?name=images/[hash].[ext]"
		}]
	},
	plugins: [
		/*new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			sourceMap: false,
			mangle: false
		}),*/
		new ExtractTextPlugin("[name].css")
	],
	vue: {
		css: ExtractTextPlugin.extract("[name].css")
	},
	babel: {
		presets: ['es2015', 'stage-0'],
		plugins: ['transform-runtime']
	},
	resolve: {
		root: [path.join(__dirname, "src/libs")],
		extensions: ['', '.js'],
		alias: {
			zepto: 'zepto/zepto',
			fastclick: 'fastclick',
			mDialog: 'mDialog/mDialog',
			lrz: 'lrz/lrz.all.bundle',
			vue: 'vue/dist/vue',
			vueResource: 'vue-resource/dist/vue-resource',
			vueRouter: 'vue-router/dist/vue-router'
		}
	}
};