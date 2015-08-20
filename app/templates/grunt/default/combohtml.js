/**
 * 静态合并HTML和抽取JS/CSS，解析juicer语法到vm/php
 * https://npmjs.org/package/grunt-combohtml
 */
module.exports = {
	options: {
		encoding: 'utf8',
		replacement: {
			from: /src\//,
			to: 'build/'
		},
		// KISSY Modules Maps File 地址
		// comboMapFile:base + '/<%= abcpkg.group %>/<%= abcpkg.name %>/<%= abcpkg.version %>/map-min.js',
		tidy: false,  // 是否重新格式化HTML
		mockFilter: false, // 是否过滤Demo中的JuicerMock
		comboJS: true, // 是否静态合并当前页面引用的本地js为一个文件
		comboCSS: true, // 是否静态合并当前页面引用的css为一个文件
		convert2vm: false,// 是否将juicer语法块转换为vm格式
		convert2php: false, // 是否将juicer语法块转换为php格式
		comboExt: '_combined' // 静态合并后的js和css后缀
		//htmlProxy: '<%= abcpkg.htmlProxy %>',      // htmlProxy 配置，用于产出线上页面区块替换为本地模块页面
		//htmlProxyDestDir: 'html-fragments'      // html 代理区块页面生成到的目标目录
	},
	main: {
		options: {
			// assetseParser: !isH5, // 参照TIP@2014-8-15
			// 本地文件引用替换为线上地址
			relative: '<%= assetsPath %>',
			combineAssets: false, // 配合 relative 使用,将页面中所有以CDN引用的JS/CSS文件名进行拼合，CDN 服务器支持Combo功能时开启
			// KISSY Modules Maps File 地址，以 relative 作为相对路径
			comboMapFile: null,
			meta: {
				'pageid': '${path|regexp,"build/",""}'
			}
		},
		files: [
			{
				expand: true,
				cwd: 'src',
				src: ['pages/**/*.html'],
				dest: 'build/'
			}
		]
	}
};
