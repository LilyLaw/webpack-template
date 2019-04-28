const path = require('path'),
	MiniCssExtractPlugin = require('mini-css-extract-plugin'),
	OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
	UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
	merge = require('webpack-merge'),
	commonConfig = require('./webpack.common.js');

let prodConfig = {
	mode:'production',
	output:{
		filename:'main.[hash].js',
		path:path.resolve(__dirname,'dist')
	},
	module:{
		rules:[
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
			}
		]
	},
	plugins:[
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

module.exports = merge(commonConfig,prodConfig);