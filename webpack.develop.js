const path = require('path')
	merge = require('webpack-merge'),
	commonConfig = require('./webpack.common.js');

let devConfig = {
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
			}
		]
	}
}

module.exports = merge(commonConfig , devConfig);