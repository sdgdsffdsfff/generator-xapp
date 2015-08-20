
function initPageFiles(prefix,pageName){
	// this.template('package.json','package.json');
	prefix = prefix === undefined ? '' : prefix;
	this.template(folder + 'pages/' + pageName + 'index.js');
	this.template(folder + 'pages/' + pageName + 'index.js');
	this.template(folder + 'pages/' + pageName + 'index.js');
	this.template(folder + 'pages/' + pageName + 'index.js');

}

exports = {
	initPageFiles: initPageFiles
};
