/**
 * dom 操作插件集
 */
module.exports = {
	main: {
		options: {
			plugins: ['stat', 'load'],        	// 要启用的插件
			//orderHead: [],                				              // 要首先调用的插件
			orderTail: ['stat']								                    // 最后调用的插件
		},
		files: [
			{
				expand: true,
				cwd: 'build/',
				dest: 'build/',
				src: ['**/*.html']
			}
		]
	}
};
