/**
 * 本文件是 Gruntfile.js 默认模板，请根据需要和注释提示自行修改
 * 从这里获得最新版
 * http://gitlab.alibaba-inc.com/trip-tools/generator-clam/blob/master/app/templates/Gruntfile_src.js
 * 文档地址:
 * http://cnpmjs.org/package/generator-clam
 */
var path = require('path'),
	clamUtil = require('clam-util'),
	fs = require('fs'),
	exec = require('child_process').exec;

module.exports = function (grunt) {
	require('time-grunt')(grunt);

	// -------------------------------------------------------------
	// 智能载入模块
	// https://github.com/shootaroo/jit-grunt
	// -------------------------------------------------------------
	require('jit-grunt')(grunt);

	var task = grunt.task;

	// -------------------------------------------------------------
	// 任务配置
	// -------------------------------------------------------------

	var packageConfig = require('./package.json');
	var gruntConfig = clamUtil.loadGruntConfig(packageConfig, grunt);
	gruntConfig.packageConfig = packageConfig;
	gruntConfig.currentBranch = 'master';

	grunt.initConfig(gruntConfig);

	// -------------------------------------------------------------
	// 注册Grunt子命令
	// -------------------------------------------------------------


	var taskAction = [
		'clean:build',
		'copy:main',
		'less:main',
		'sass:main',
		'kmb:main',
		'combohtml:main',
		'uglify:main',
		'domman:main',
		'replace:main',
		'cssmin:main'
	];
	grunt.registerTask('fast_build', '执行在线调试的快速构建', function () {
		grunt.config.set('kmb.offline.options.compress', false);
		task.run(taskAction);
	});

	// 默认构建流程
	grunt.registerTask('build', '执行构建脚本', function () {
		task.run(taskAction);
	});

	// 构建程序入口
	return grunt.registerTask('default', 'Clam 默认流程', function (type, msg) {
		grunt.log.write('构建开始!');
		task.run(['build']);
	});
};
