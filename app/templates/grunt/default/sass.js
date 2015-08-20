/**
 * sass build task
 */
module.exports = {
	options: {
		sourcemap: 'none'
	},
	main: {
		files: [
			{
				expand: true,
				cwd: 'src/',
				src: ['**/*.scss', '!widgets/**/*.scss', '!**/build/**/*.scss'],
				dest: 'build/',
				ext: '.css'
			}
		]
	}
};
