/**
 * 监听文件修改，实时构建任务
 */
var watch_files = [
	'src/**/*.js',
	'src/**/*.css',
	'src/**/*.less',
	'src/**/*.php',
	'src/**/*.html',
	'src/**/*.htm',
	'src/**/*.scss',
	'!src/**/node_modules/**/*',
	'!src/**/build/**/*'];

module.exports = {
	options: {
		livereload: true
	},
	'server': {
		files: watch_files,
		tasks: ['fast_build']
	}
};
