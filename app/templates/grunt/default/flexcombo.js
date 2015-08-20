/**
 * FlexCombo 服务配置
 * https://npmjs.org/package/grunt-flexcombo
 *
 * 注意：urls 字段末尾不能有'/'
 */
module.exports = function (packageConfig) {
	return {
		// 源码调试服务
		server: {
			options: {
				proxyport: '<%= packageConfig.proxyPort %>',               	// 本地反向代理端口
				target: './',                                     // flex-combo 要代理的目录
				urls: '/<%= packageConfig.assetsPath %>',    // flex-combo 要代理的匹配 url
				port: '<%= packageConfig.port %>',                         // 本地服务端口
				proxyHosts: [                                       // 本地反向代理需要代理的主机名
					'demo',
					'demo.com'
				],
				needHttps: false,								// 是否开启 HTTPS 请求监控，默认 false
				livereload: false,							// 是否自动刷新，默认 false，可配置为 true 或期望 livereload 服务工作的端口号
				weinrePort: 8091               // weinre 运行端口号
			}
		}
	}
};
