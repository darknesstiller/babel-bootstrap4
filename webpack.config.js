// We are using node's native package 'path'
// https://nodejs.org/api/path.html
const path = require('path');

const webpack = require('webpack'); // reference to webpack Object

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
	filename: 'main.css'
});
// Constant with our paths
const paths = {
	DIST: path.resolve(__dirname, 'dist'),
	SRC: path.resolve(__dirname, 'src')
};

// Webpack configuration
module.exports = {
	entry: [path.join(paths.SRC, 'app.js')],
	output: {
		path: paths.DIST,
		filename: 'app.bundle.js',
		publicPath: '/dist'
	},
	// Tell webpack to use html plugin -> ADDED IN THIS STEP
	// index.html is used as a template in which it'll inject bundled app.
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			Popper: 'popper.js'
		}),
		extractPlugin
	],
	// Loaders configuration -> ADDED IN THIS STEP
	// We are telling webpack to use "babel-loader" for .js and .jsx files
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.scss$/,
				use: extractPlugin.extract({
					use: ['css-loader', 'sass-loader']
				})
			}
		]
	},
	// Enable importing JS files without specifying their's extenstion -> ADDED IN THIS STEP
	//
	// So we can write:
	// import MyComponent from './my-component';
	//
	// Instead of:
	// import MyComponent from './my-component.jsx';
	resolve: {
		extensions: ['.js', '.jsx']
	}
};
