const path = require('path')
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry:'./src/index.js',
	mode:'development',
	output:{
		filename:'main.js',
		path:path.resolve(__dirname,'build')
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				use:[
					{
						loader:'style-loader',
						options:{
							sourceMap:true
						}
					},
					{
						loader:'css-loader',
						options:{
							sourceMap:true
						}
					}
				]
			},
			{
				test:/\.less$/,
				use:[
					{
						loader:'style-loader',
						options:{
							sourceMap:true
						}
					},
					{
						loader:'css-loader',
						options:{
							sourceMap:true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							sourceMap: true,
							plugins: loader => [
								require('autoprefixer')({ browsers: ['> 0.15% in CN'] }) // 添加前缀
							]
						}
					},
					{
						loader:'less-loader',
						options:{
							sourceMap:true
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
			title : '手动搭建webpack开发框架',
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
	],
}