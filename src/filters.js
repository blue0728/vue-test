"use strict"

var Vue = require('vue');

Vue.filter('parseint', function(value) {
	return parseInt(value);
});

Vue.filter('qiniu', function(value, m, w, h) {
	if(!value){
		return;
	}
	return value.split(',')[0].split('?')[0] + '?imageView2/' + m + '/w/' + w + '/h/' + h;
});