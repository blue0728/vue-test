'use strict'

var Vue = require('vue');
var VueRouter = require('vueRouter');
var VueResource = require('vueResource');
var routerMap = require('./routers');

require('./filters');

Vue.use(VueResource);
Vue.use(VueRouter);

Vue.http.options.emulateJSON = true; // 设置VueResource ajax 数据类型

var App = Vue.extend();

var router = new VueRouter({
	hashbang: true,
	history: false,
	saveScrollPosition: true,
	transitionOnLoad: true
});

routerMap(router);

router.start(App, '#app')