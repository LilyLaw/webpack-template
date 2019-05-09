const path = require('path')
	merge = require('webpack-merge'),
	commonConfig = require('./webpack.common.js'),
	webpack = require('webpack'),
	BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let devConfig = {
	mode:'development',
	output:{
		filename:'main.js',
		path:path.resolve(__dirname,'build')
	},
	devtool: 'inline-source-map',	// 使用sourcemap定位代码
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
	},
	devServer: {
		clientLogLevel: 'warning',
		hot: true,
		contentBase:  path.join(__dirname, "dist"),
		compress: true,
		host: 'localhost',
		port: 3012,
		open: true,
		overlay: {
			warnings: true,
			errors: true
		},
		publicPath: '/',
		quiet: true,
		watchOptions: {
			poll: true,
			ignored: /node_modules/,
			aggregateTimeout: 300
		}
	},
	plugins: [
		new BundleAnalyzerPlugin()
	    // new webpack.NamedModulesPlugin(),  // 更容易查看(patch)的依赖
	    // new webpack.HotModuleReplacementPlugin()  // 替换插件
    ],
}

module.exports = merge(commonConfig , devConfig);