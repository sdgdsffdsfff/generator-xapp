/**
 * @fileoverview <%= packageName %> - Home.
 * @author <%= author %> - <%= email %>
 */
/**
 * KISSY.use('<%= packageName %>/pages/home/index',function(S,Home){
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
			
			/* 这里开始你的代码 */
			$('h1').html('ok, ' + opt.msg);

			return this;
		}
	};

	// 混合自定义事件的掺元对象
	S.mix(Home, S.Event.Target);
	module.exports = Home;
});
