const path = require('path'),
	UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry:'./src/index.js',
	resolve: {
		extensions:['.js','jsx','.json'],
		alias: {
			'@': path.resolve(__dirname, 'src/'),
			'img': path.resolve(__dirname, 'assets/img/'),
		}
	},
	module:{
		rules:[
			{
				test:/\.js$/,
				exclude: /(node_modules)/,
				use:[
					{
						loader:'babel-loader',
						options:{
							presets: ['@babel/preset-env']
						}
					},
					{
						loader:'eslint-loader',
						options:{
							fix: true,
							cache: true
						}
					}
				]
			},
			{
				test: /\.(png|jpg|gif|svg|jpeg)$/,
				use:[
					{
						loader: 'url-loader',
						options: {
							limit : 10000
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: true,
								quality: 65
							},
							optipng: {
								enabled: false,
							},
							pngquant: {
								quality: '65-90',
								speed: 4
							},
							gifsicle: {
								interlaced: false,
							},
							webp: {
								quality: 75
							}
						}
					}
				]
			}
		]
	},
	plugins:[
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title : 'webpack开发框架',
			filename : 'index.html',
			template : path.resolve(__dirname,'src/index.html'),
			minify : {
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				useShortDoctype: true
			}
		})
	]
}