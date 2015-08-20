/**
 * replace task
 */
module.exports = function (packageConfig){

	return {
		// 将资源文件引用域名替换为 g-assets.daily.taobao.net
		main: {
			options: {
				variables: {
					'href="../../': 'href="<%= packageConfig.assetsPath %>',
					'src="../../': 'src="<%= packageConfig.assetsPath %>'
				},
				prefix: ' '
			},
			files: [
				{
					expand: true,
					cwd: 'build/',
					dest: 'build/',
					src: ['pages/*.html']
				}
			]
		}
	};
};
