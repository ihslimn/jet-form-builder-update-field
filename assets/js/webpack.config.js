var path = require('path');
var webpack = require('webpack');

module.exports = {
	name: 'blocks',
	context: path.resolve( __dirname, 'src' ),
	entry: {
		'blocks.js': 'main.js',
	},
	output: {
		path: path.resolve( __dirname ),
		filename: '[name]'
	},
	resolve: {
		modules: [
			path.resolve( __dirname, 'src' ),
			'node_modules'
		],
		extensions: [ '.js' ],
		alias: {
			'@': path.resolve( __dirname, 'src' ),
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			}
		]
	}
}
