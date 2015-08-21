(function () {
    KISSY.config('tag', null);

	var assetsPath = '../../';

	if(window.location.href.indexOf('src/pages') < 0){
		assetsPath = "<%= assetsPath %>";
	}

	KISSY.config({
		packages: [{
			name: "<%= packageName %>",
			path: assetsPath,
		}]
	});

    /**
     * grunt-kmb 支持别名配置，你可以：
     *  1. 将别名配置写在 config.js 里，同时配置到 kmb 任务的配置项里
     *  2. 将别名配置放在单独的 alias.js 里，页面引用该 js，并在 kmb 任务的配置项里加入该 alias.js 文件路径
     */
})();
