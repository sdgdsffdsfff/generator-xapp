/**
 * dom 操作插件集
 */
module.exports = {
	online: {
		options: {
			plugins: ['stat', 'custom'],      // 要启用的插件
			//orderHead: [],                	// 要首先调用的插件
			orderTail: ['stat'],							// 最后调用的插件
			custom: function ($, filePath) {						// 自定义操作，参考 jQuery API
				//$('head').prepend('<meta name="pagePath" content="' + filePath + '"/>');
			}
		}
	}
};