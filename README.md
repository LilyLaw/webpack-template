## 整体架构

### css相关

	- [style-loader](https://webpack.js.org/loaders/style-loader)

		> Adds CSS to the DOM by injecting a ```<style>``` tag

		将css写进一对```<style>```标签里，再通过JavaScript脚本把这个标签注入到html页面，如下图

		![style-loader的作用](https://github.com/LilyLaw/webpack-template/blob/master/assets/img/style-loader.png?raw=true)

		这个一般在开发过程中使用，生产环境中尽量抽取css到单独的文件

	- [css-loader](https://webpack.js.org/loaders/css-loader)

		在项目中，如果是通过```@import```, ```require()```, ```url()``` 等方式调用css，webpack是无法解析的，webpack默认只能解析JavaScript，所以需要css-loader来解析上述语法。

	- [less-loader](https://webpack.js.org/loaders/less-loader)

		在```webpack```中将less编译成css

	- postcss-loader

		内容太多，先去看看 postcss 是什么吧 https://postcss.org/

	- [MiniCssExtractPlugin](https://webpack.js.org/plugins/mini-css-extract-plugin/#root)

		单独抽取出css文件，只能在```production```模式下使用,用了这个插件就不能再用```style-loader```了。

	- [OptimizeCSSAssetsPlugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin)

		css压缩插件，把一些空格换行之类的字符去掉，减少文件大小

### js相关

	- [babel-loader](https://webpack.js.org/loaders/babel-loader/#root)

		目前并非全部浏览器都会支持babel语法,所以在```webpack```环境中需要将```babel```语法转换为浏览器可识别的js语法,```babel-loader```就是来做这个的。

	- [UglifyJsPlugin](https://webpack.js.org/plugins/uglifyjs-webpack-plugin)

		js压缩插件

		**注意** js压缩插件```uglifyjs-webpack-plugin```默认无法压缩ES6语法的js代码，因此需要babel来预先解析成ES5的语法。否则会报错

		> <font color=#00ffff>ERROR in main.js from UglifyJs  Unexpected token: name «domsss», expected: punc «;» [./src/index.js:5,0][main.js:17207,5]</font>

### 非js文件相关

	- [file-loader](https://webpack.js.org/loaders/file-loader/)

		webpack默认只能处理js文件，对于```.png```,```jpg```,```jpeg```等格式的图片或其他文件是无法识别的，会报错。为了可以使用这些文件，需要用```file-loader```解析。

	- [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader#image-webpack-loader)

		压缩图片

	- []()

### 其他

- [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/#root)

	把打包后的 CSS 或者 JS 文件的引用直接注入到 HTML 模板中（动态的添加```link``` , ```script``` ,不再是将整个文件注入到html中），这样就不用每次手动修改文件引用了（尤其是文件名中有哈希值的时候）。

- [CleanWebpackPlugin](https://webpack.js.org/guides/output-management/#cleaning-up-the-dist-folder)

	每一次打包的时候，先将上一次打包的文件清理掉，放置过期无用文件堆积













**注意**

1. loader如果是一个数组，则调用顺序是从后往前。 比如 处理less用到了 less-loader，css-loader，style-loader，因此正确写法应该像下面：

   ```javascript
	{
		test:/\.less$/,
		loader:['style-loader','css-loader','less-loader']
	}
   ```