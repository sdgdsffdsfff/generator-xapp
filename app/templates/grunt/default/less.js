/**
 * less
 */
module.exports = {
	options: {
		strictImports: true,
		relativeUrls: true  // 将从其他 less 文件中导入的 url() 中相对路径图片引用替换为相对当前 less 文件路径
	},
	main: {
		files: [
			{
				expand: true,
				cwd: 'src/',
				src: ['**/*.less', '!widgets/**/*.less', '!**/build/**/*.less'],
				dest: 'build/',
				ext: '.css'
			}
		]
	}
};
