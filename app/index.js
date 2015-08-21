// 'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var ABC = require('abc-generator');
var Promise = require('promise');
var Logo = require('./logo').Logo;
var exec = require('child_process').exec;
var gitConfig = require('git-config'),
	curGitUser = gitConfig.sync().user,
	curUserName = curGitUser.name,
	curUserEmail = curGitUser.email;

var MyGenerator = module.exports = function MyGenerator(args, options, config) {
	ABC.UIBase.apply(this, arguments);
	var self = this;
	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

	this.on('error', function () {
	});
	this.on('end', function () {
		var cb = this.async();
		var that = this;

		var cb = this.async();
		var that = this;

		var loadCallback = function (loadName, error, resolve, reject) {
			if (error !== null) {
				console.error('Load ' + loadName + ' error: ' + error);
				reject(error);
			} else {
				console.log('Load ' + loadName + ' success');
				resolve();
			}
		};

		// load grunt task config
		var loadGruntTaskConfigPromise = new Promise(function(resolve, reject) {

			// grunt task config template
			exec('cd grunt;bower install;cd ../', function (error, stdout, stderr) {
				loadCallback('grunt 命令安装', error, resolve, reject);
			}.bind(that));

		});

		var loadBasePromise = new Promise(function (resolve, reject) {

			exec('cd src/widgets/;bower install;cd ../../', function (error, stdout, stderr) {
				loadCallback('种子文件安装', error, resolve, reject);
			}.bind(that));

		});

		Promise.all([loadGruntTaskConfigPromise, loadBasePromise])
			.then(function() {

				this.prompt([
					{
						name   : 'npm_install',
						message: 'Install node_modules for grunt now?',
						default: 'N/y',
						warning: ''
					}
				], function (props, err) {

					if (err) {
						return this.emit('error', err);
					}

					this.npm_install = (/^y/i).test(props.npm_install);
					if (this.npm_install) {
						this.npmInstall('', {}, function (err) {

							if (err) {
								return console.log('\n' + yellow('please run "sudo tnpm install"\n'));
							}
							console.log(green('\n\nnode modules was installed successful. \n\n'));
						});
					} else {
						console.log(yellow('\n\nplease run "tnpm install --silent" before `grunt`\n'));
						console.log(green('\ndone!\n'));
					}
				}.bind(that));

			}.bind(that));

	}.bind(this));
};

util.inherits(MyGenerator, ABC.UIBase);

MyGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	// welcome message
	console.log(Logo(this));

	var packageJSON = {};
	try {
		packageJSON = require(path.resolve(process.cwd(), 'package.json'));
	} catch (e) {

	}

	// have Yeoman greet the user.
	// console.log(this.yeoman);
	var folderName = path.basename(process.cwd());

	// your-mojo-name => YourMojoName
	function parseMojoName(name) {
		return name.replace(/\b(\w)|(-\w)/g, function (m) {
			return m.toUpperCase().replace('-', '');
		});
	}

	var prompts = [
		{
			name   : 'projectName',
			message: 'project Name(项目名)',
			default: folderName,
			warning: ''
		},
		{
			name   : 'projectDesc',
			message: 'Description of this Widget?(描述)',
			default: folderName,
			warning: ''
		},
		{
			name   : 'gitRepository',
			message: 'Chose Your Git Repository(git仓库):',
			type	 : 'list',
			choices: ['gitlab.alibaba-inc.com', 'github.com'],
			default: 'github.com',
			warning: ''
		},
		{
			name   : 'assetsPath',
			message: '资源文件(js/css)上线地址根目录(可以是绝对或相对路径)',
			default: '../../',
			warning: ''
		},
		{
			name   : 'cssCompile',
			message: 'scss/less?',
			type	 : 'list',
			choices: ['scss', 'less'],
			default: 'scss',
			warning: ''
		},
		{
			name   : 'author',
			message: 'Author Name(花名):',
			default: curUserName,
			warning: ''
		},
		{
			name   : 'email',
			message: 'Author Email(邮箱):',
			default: curUserEmail,
			warning: ''
		},
		{
			name   : 'version',
			message: 'Version(版本):',
			default: '0.1.0',
			warning: ''
		}
	];

	/*
	 * projectName：驼峰名称,比如 ProjectName
	 * packageName：原目录名称，比如 project-name
	 **/
	this.prompt(prompts, function (props) {

		this.packageName = props.projectName;// project-name
		this.projectName = parseMojoName(this.packageName); //ProjectName
		this.packageDesc = props.projectDesc;
		this.packageJSON = packageJSON;
		this.packageConfig = packageJSON;
		this.gitRepository = props.gitRepository;
		this.author = props.author;
		this.email = props.email;
		this.version = props.version;
		this.port = props.port;
		this.proxyPort = props.proxyPort;
		this.cssCompile = props.cssCompile;

		// 计算 assetsPath，末尾补全`/`
		if(props.assetsPath.indexOf('http://') == 0 ){
			// http://abc.com
			this.assetsPath = props.assetsPath;
		} else if(/^\w/.test(props.assetsPath)){
			// 不带 http 的域名
			this.assetsPath = 'http://' + props.assetsPath;
		} else {
			this.assetsPath = props.assetsPath;
		}

		this.assetsPath = this.assetsPath.replace(/\/$/i,'') + '/';
		cb();

	}.bind(this));
};

MyGenerator.prototype.bowerJSON = function bowerJSON() {
	this.template('_bowerrc', '.bowerrc');
};

MyGenerator.prototype.git = function git() {
	this.copy('_gitignore', '.gitignore');
};


MyGenerator.prototype.app = function app() {
	var that = this;

	// 创建文件夹
	this.mkdir('build');
	this.mkdir('src');
	this.mkdir('src/pages');
	this.mkdir('src/mods');
	this.mkdir('src/widgets');
	this.mkdir('doc');
	this.mkdir('grunt');
	this.mkdir('grunt/default');
	this.mkdir('grunt/custom');

	// 创建根目录文件
	this.copy('Gruntfile.js','Gruntfile.js');
	this.template('package.json','package.json');
	this.template('README.md','README.md');

	// 创建config.js
	this.template('src/config.js','src/config.js');

	// 创建种子文件bower.json
	this.copy('src/widgets/bower.json');

	// 生成grunt命令
	//this.copy('src/config.js','src/config.js');

	// 生成grunt的bower文件
	this.copy('grunt/bower.json');

	// 初始化mod
	this.template('src/mods/header.html');

	// 初始化一个home Page
	this.template('src/pages/home/index.html');
	this.template('src/pages/home/index.js');
	this.template('src/pages/home/index.scss','src/pages/home/index.'+this.cssCompile);
};

function consoleColor(str, num) {
	if (!num) {
		num = '32';
	}
	return "\033[" + num + "m" + str + "\033[0m"
}

function green(str) {
	return consoleColor(str, 32);
}

function yellow(str) {
	return consoleColor(str, 33);
}

function red(str) {
	return consoleColor(str, 31);
}

function blue(str) {
	return consoleColor(str, 34);
}
