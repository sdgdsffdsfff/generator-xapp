/**
 * 压缩CSS
 */
module.exports = {
	main: {
		files: [
			{
				expand: true,
				cwd: 'build/',
				src: [
					'**/*.css',
					'!**/*-min.css',
					'!**/*.less.css',
					'!**/*.scss.css'
				],
				dest: 'build/',
				ext: '.css'
			}
		]
	}
};
