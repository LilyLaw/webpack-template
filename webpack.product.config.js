const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';	// 判断当前环境是 开发环境还是部署环境
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry:'./src/index.js',
	mode:'production',
	output:{
		filename:'main.js',
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