const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
	mode: NODE_ENV || "development",
	entry: path.resolve(__dirname, 'src/index.js'),
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
		assetModuleFilename: './assets/[name][ext]',
	},

	context: path.resolve(__dirname, 'src/'),
	watch: NODE_ENV === 'development',
	watchOptions: {
		ignored: /node_modules/,
		poll: 1000,
	},
	
	plugins: [
		new HTMLWebpackPlugin({
			template: path.resolve(__dirname, 'public/index.html'),
		}),
		new MiniCssExtractPlugin(),
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
				use: [NODE_ENV === 'development' ? "style-loader" : MiniCssExtractPlugin.loader,
				'css-loader', 'sass-loader']
			},

			{
        test: /\.html$/i,
        loader: "html-loader",
      },

			{
				test: [/\.svg$/, /\.png$/, /\.bmp$/, /\.gif$/, /\.jp?g$/],
				type: 'asset/resource',
				generator: {
					filename: 'assets/pics/[name][ext]',
				},
			},

			{
				test: [/\.ttf$/, /\.woff$/, /\.woff2$/, /\.eot$/],
				type: 'asset/resource',
				generator: {
					filename: 'assets/fonts/[name][ext]',
				},
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
