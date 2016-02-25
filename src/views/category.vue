<style>
/*分类*/
.cate-list { min-height: 5rem;background-color: #f7f7f7;}
.cate-list li { line-height: 2rem; height: 2rem; background-color: #fff;}
.cate-list li a { position: relative;display: block; overflow: hidden;height: 2rem;padding: 0 .512rem; padding-right: 2rem; white-space: nowrap;text-overflow: ellipsis;border-bottom: 1px solid #eee;}
.cate-list li a span { font-size: .6rem;position: absolute;top: 0;right: 1.1rem;color: #666;}
.cate-list li:first-child {margin: .43rem 0;}
.cate-list li:last-child a { border-bottom: none;}	
</style>
<template>
<ul class="cate-list">
	<li class="arrows-right"><a href="/shop/product/category" class="f14">全部分类<span v-text="nums"></span></a></li>
	<li class="arrows-right" v-for="item in list">
		<a class="f14" v-link="{name: 'catepros', params: {id: item.CategoryID, name: item.Name}}" v-text="item.Name"></a>
	</li>
</ul>
</template>
<script>
module.exports = {
	ready: function(){
		var that = this;
		that.$http.post('/api/mall/category-list', {MemberID: localStorage.id})
			.then(
				function(res){
					if(res.data.flag == 1){
						that.list = res.data.data;
						that.nums = res.data.extra.productNum
					}	
				}
			)
	},
	data: function(){
		return {
			list: '',
			nums: 0
		}
	}
}	
</script>