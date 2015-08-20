/**
 * @fileoverview H5Test - Home.
 * @author 拔赤<jay.li@alibaba-inc.com>.
 */
/**
 * KISSY.use('h5-test/pages/home/index',function(S,Home){
 *		new Home();
 * });
 */
KISSY.add(function (S, require, exports, module) {

	"use strict";
	var $ = S.all;
	/*
	 * 函数调用方法
	 * Home.init({
	 *		// Key: Value 形式的参数
	 * })
	 * */
	var Home = {
		init:function(opt){
			var self = this;
			self.buildParam(opt);
			
			/* 这里开始你的代码 */
			$('h1').html('ok, ' + self.msg);

			return this;
		},
		/* 将入参挂到单例对象上 */
		buildParam:function(o){
			var self = this;
			o = (o === undefined) ? {} : o;
			function setParam(def, key){
				var v = o[key];
				self[key] = (v === undefined || v === null) ? def : v;
			}
			S.each({
				/* 构造器默认参数,key:value 形式 */
			},setParam);
			return this;
		}
	};

	S.mix(Home, S.Event.Target);
	module.exports = Home;
});
