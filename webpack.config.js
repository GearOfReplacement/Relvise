const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;

module.exports = {
	mode: NODE_ENV || "development",
	entry: path.resolve(__dirname, 'src/index.js'),
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},

	watch: NODE_ENV === 'development',
	watchOptions: {
		ignored: /node_modules/,
		poll: 1000,
	},
	
	plugins: [
		new HTMLWebpackPlugin({
			template: path.resolve(__dirname, 'public/index.html'),
		}),
	],

	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: [/node_modules/],
			},

			{
				test: /\.s[ca]ss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},

			{
				test: [/\.svg$/, /\.png$/, /\.bmp$/, /\.gif$/, /\.jp?g$/],
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'assets/',
						}
					}
				]
			},

			{
				test: [/\.ttf$/, /\.woff$/, /\.woff2$/, /\.eot$/],
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts/',
						}
					}
				]
			},
		]
	},

	devServer: {
		port: 3000,
		open: true,
		hot: true,
		historyApiFallback: true,
	},

	devtool: NODE_ENV === 'development' ? 'source-map': false,
}