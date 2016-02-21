// As resolve.extensions gets evaluated from left to right, we can use it to control which 
// code gets loaded for given configuration. For instance, you could have .web.js to define web 
// specific parts and then have something like ['', '.web.js', '.js', '.jsx']. If a "web" version 
// of the file is found, Webpack would use that instead of the default.



const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const NpmInstallPlugin = require('npm-install-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build')
};

process.env.BABEL_ENV = TARGET;

const common = {
	// Entry accepts a path or an object of paths.
	entry: {
		app: PATHS.app
	},
	// add resolve.extensions.
	// '' is needed to allow imports without an extension.
	// Note the .'s before the exetnesions as it will fail to match without!!!!
	resolve: {
		extensions: ['', '.js', '.jsx']
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
			},
			{
				//Setup jsx. Accepts js too because of regex
				test: /\.jsx?$/,
				// Enable caching for improved performance during development
				// It uses default OS directory by default. If you need something
				// more custom, pass a path to it. ie., babel?cacheDirectory=<path>
				loaders: ['babel?cacheDirectory'],
				// Parse only app files! Without this it will go through the entire project.
				// In addition to being slow, that will most likely jack shit up. 
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