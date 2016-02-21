const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const NpmInstallPlugin = require('npm-install-webpack-plugin');

const TARGET = process.env.npm_lifecylce_event;

const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build')
};

const common = {
	// Entry accepts a path or an object of paths.
	entry: {
		app: PATHS.app
	},
	output: {
		path: PATHS.build,
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				// Test expacts a regexpression right here, so note the slashes
				test: /\.css$/,
				loaders: ['style', 'css'],
				// Include accepts either a path or an array of paths.
				include: PATHS.app 
			}
		]
	}
};

// Default Configuration
if(TARGET === 'start' || !TARGET){
	module.exports = merge(common, {
		// SOURCE MAPS IS BAD FOR PROUDCTION MMKAY
		devtool: 'eval-source-map',
		devServer: {
			contentBase: PATHS.build,
			// enable api fallback so html5 history routing works
			historyApiFallback: true,
			hot: true,
			inline: true,
			progress: true,

			// Display only errors to reduce output
			stats: 'errors-only',
			// parse host and port from env so this is easy to customize

			// VAGRANT - host: process.env.HOST || '0.0.0.0';
			host: process.env.HOST,
			port: process.env.PORT
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new NpmInstallPlugin({
				save: true // --save on cli
			})
		]
	});
}

if(TARGET === 'build'){
	module.exports = merge(common, {});
}