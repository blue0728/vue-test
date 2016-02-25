<style>
.fav-product-list {background: #fff;}
.fav-product-list li { margin-left: .512rem;padding: .64rem .533rem .64rem 0;border-bottom: 1px solid #eee;}
.fav-product-list li a.fl { position: relative;}
.fav-product-list li a span {line-height: .704rem;position: absolute;right: 0; bottom: 0;left: 0;display: block;height: .704rem;text-align: center;border-radius: 0 0 .1rem .1rem;background: rgba(0,0,0,.4);}
.fav-product-list li div { position: relative;width: 10.8rem;height: 3.584rem;margin-left: .5rem;}
.fav-product-list li p.p-subject {line-height: .853rem;display: -webkit-box;overflow: hidden;height: 1.6rem;text-overflow: ellipsis;-webkit-line-clamp: 2;-webkit-box-orient: vertical;}
.fav-product-list li p.p-subject a {display: block;height: 1.6rem;}
.fav-product-list li p.p_cz { position: absolute; right: 0;bottom: 0; left: 0;text-align: right;}
.fav-product-list li img {display: block;width: 3.584rem;height: 3.584rem;border: 1px solid #ccc;border-radius: .1rem;}
.fav-product-list li strong {font-weight: normal;position: absolute;bottom: 0;left: 0;}
.fav-product-list li p.p_tags { font-size: .45rem; line-height: .6rem; margin-top: .22rem;}
.fav-product-list li p.p_tags i {display: block;float: left;width: .6rem; height: .6rem;margin-right: .5em;background-repeat: no-repeat;background-size: 100%;}
.fav-product-list li p.p_tags i.t-hui {background-image: url(../assets/images/hui.png);}
.fav-product-list li p.p_tags i.t-quan { background-image: url(../assets/images/quan.png);}
.fav-product-list li p.p_cz i { display: inline-block; width: 1.5rem;height: 1rem;}
.fav-product-list li p.p_cz i.f-del { background: url(../assets/images/dele.png) center right no-repeat;background-size: .72rem;}
.fav-product-list li p.p_cz i.p-cart {background: url(../assets/images/add-cart.png) center right no-repeat;background-size: .91rem;}	
</style>
<template>
<ul class="fav-product-list">
	<li v-for="item in product" class="cle">
	    <a  class="go-detail fl" v-link="{name: 'details', params: {id: item.ProductID}}">
	        <img src="../assets/images/default.jpg" data-lazyload="{{item.Pictures.split(',')[0] | qiniu '5' '200' '200'}}"/>
	        <span class="c_fff f10" v-if="item.Stock == '0' || item.Status!= 'ON' || item.IsValid!= 'Y'">失效</span>
	    </a>
	    <div class="fr">
	        <p class="p-subject"><a v-link="{name: 'details', params: {id: item.ProductID}}" class="go-detail c_333 f12" v-text="item.Subject"></a></p>
	            <p class="p_tags red cle" v-if="item.Status == 'ON' && (item.MarkdownText != '' || item.HasBonuse =='Y' || item.Promotions.length > 0)">
	                <i class="t-hui" v-if="item.Promotions.length > 0"></i>
	                <i class="t-quan" v-if="item.HasBonuse =='Y'"></i>
	                <span class="f10" v-text="item.MarkdownText"></span>
	            </p>    
	        <p class="p_cz">
	            <strong class="red f14" v-text="'&yen;' + item.FinalPrice"></strong>
	            <i @click="addcart" v-if="item.Stock != '0' && item.Status == 'ON' && item.IsValid == 'Y'" class="p-cart" data-id="{{item.ProductID}}" data-source="{{item.Utm_Source}}">&nbsp;</i> 
	            <i @click="dele" class="f-del" data-id="{{item.ProductID}}">&nbsp;</i>
	        </p>
	    </div>
	</li>
</ul>
<div class="load" v-if="lock"><span>加载更多</span></div>
<add-cart :details.sync="details" :count.sync="count"></add-cart>
<cart :count.sync="count"></cart>
</template>
<script>
var imglazyload = require('imglazyload');
var tips = require('tips');
var arrData = [];
module.exports = {
	ready: function(){
		var that = this;

		that.$http.post('/api/me/favorites', that.page)
			.then(
				function(res){
					if(res.data.flag == 1){
						that.product = res.data.data;

						$.each(res.data.data, function(i,v){
							arrData.push(v);
						});

						that.loadimg();

						if (res.data.extra.total > that.page.page * that.page.pageSize) {
                        	that.lock = true;
                    	}
					}
				},
				function(res){

				}
			)

		that.$http.post('/api/cart/count',)
			.then(
				function(res){
					that.count = res.data.data;
				},
				function(res){
				}
			)	

		$(window).on('scroll', function () {
	        if (!that.lock) {
	            return;
	        }
	        var scrollTop = $(this).scrollTop();
	        var scrollHeight = $(document).height();
	        var winHeight = $(window).height();
	        var $load = $('#app').find('.load');

	        if (scrollTop + winHeight >= scrollHeight - 50) {
	            $load.css('visibility', 'visible');
                that.lock = false;
                that.page.page++;
                that.$http.post('/api/me/favorites', that.page)
                	.then(
                		function(res){
                			if (res.data.flag == 1 && res.data.data.length > 0) {
	                            if (res.data.extra.total > that.page.page * that.page.pageSize) {
	                                that.lock = true;
	                            }
	                            $.each(res.data.data, function(i,v){
									arrData.push(v);
								});
	                            that.product = arrData;
	                            $load.css('visibility', 'hidden');

	                            that.loadimg();
	                        }
                		},
                		function(res){
                			$load.css('visibility', 'hidden');
                		}
                	)
	        }
	    });	
	},
	data: function(){
		return {
			product: '',
			details: '',
			count: '',
			page: {
				page: 1,
				pageSize: 20
			},
			lock: false
		}
	},
	methods: {
		loadimg: function(){
			this.$nextTick(function () {
	        	imglazyload();
	      })
		},
		addcart: function(e){
			var that = this;
			var _this = $(e.currentTarget);
			var id = _this.data('id');

			var loading = tips.loading();

			that.$http.post('/api/product/detail',{ProductID: id})
			.then(
				function(res){
					if(res.data.flag == 1){
						that.details = res.data.data;
					}
					loading.close();
				},
				function(res){
					loading.close();
				}
			)
		},
		dele: function(e){
			var that = this;
			var _this = $(e.currentTarget);
			var id = _this.data('id');

			var con = tips.confirm('<div  class="f16" style="padding: .5rem 2.5rem;" class="f16">确定取消收藏吗？</div>', function () {

				var load = tips.loading();

				that.$http.post('/api/favorite/product-cancel',{ProductID: id})
					.then(
						function(res){
							if(res.data.flag == 1){
								_this.closest('li').hide(300,function(){
									$(this).remove();
								})
							}else{
								tips.msg(data.msg);
							}
							load.close();
							con.close();
						},
						function(res){
							load.close();
							con.close();
						}
					)

			});
		}
	},
    components: {
        'addCart': require('../components/public/addcart.vue'),
        'cart': require('../components/public/cart.vue')
    }
}
</script>