## 主要涉及

- [style-loader](https://webpack.js.org/loaders/style-loader)

	> Adds CSS to the DOM by injecting a ```<style>``` tag

	将css写进一对```<style>```标签里，再通过JavaScript脚本把这个标签注入到html页面，如下图
	
	![style-loader的作用](https://github.com/LilyLaw/webpack-template/blob/master/src/img/style-loader.png?raw=true)
	
- [css-loader](https://webpack.js.org/loaders/css-loader)

	在项目中，如果是通过```@import```, ```require()```, ```url()``` 等方式调用css，webpack是无法解析的，webpack默认只能解析JavaScript，所以需要css-loader来解析上述语法。
	
- postcss-loader

	内容太多，先去看看 postcss 是什么吧 https://postcss.org/
	
**注意** loader如果是一个数组，则调用顺序是从后往前。 比如 处理less用到了 less-loader，css-loader，style-loader，因此正确写法应该像下面：

	``` javascript
	{
		test:/\.less$/,
		loader:['style-loader','css-loader','less-loader']
	}
	```