const path = require('path'),
	MiniCssExtractPlugin = require('mini-css-extract-plugin'),
	devMode = process.env.NODE_ENV !== 'production',	// 判断当前环境是 开发环境还是部署环境
	OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
	UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry:'./src/index.js',
	mode:'production',
	output:{
		filename:'main.[hash].js',
		path:path.resolve(__dirname,'dist')
	},
	module:{
		rules:[
			{
				test:/\.js$/,
				use:{
					loader:'babel-loader',
					options:{
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test:/\.css$/,
				use:[
					MiniCssExtractPlugin.loader,
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
					MiniCssExtractPlugin.loader,
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
					'file-loader',
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
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[hash].css',
			chunkFilename: '[id].[hash].css'
		})
	],
	optimization: {
	    minimizer: [
	    	new UglifyJsPlugin({
	    		cache: true,
	    		sourceMap: true
	    	}),	// 压缩js
	    	new OptimizeCSSAssetsPlugin({}) // 压缩css
	    ]
	}
}