<template>
<div v-if="product" v-for="items in product">
	<div class="list-hd">
		<h2 class="arrows-right"><a v-link="{name: 'catepros', params: {id: items.CategoryID, name: items.Name}}" class="cle"><span class="f16 c_666 fl" v-text="items.Name"></span><i class="f14 c_999 fr">全部</i></a></h2>
	</div>
	<ul class="list-bd cle"  data-cat="{{items.CategoryID}}" id="cat-{{items.CategoryID}}">
		<li v-for="item in items.Products">
	        <a v-link="{name: 'details', params: {id: item.ProductID}}">
	        	<img src="../../assets/images/default.jpg" data-lazyload="{{item.Pictures.split(',')[0] | qiniu '5' '345' '345'}}">
		        <p class="name c_666 f12" v-text="item.Subject"></p>
			</a>
		    <p class="price cle"><span class="fl f14" v-text="'&yen;&nbsp;' + item.FinalPrice"></span><span @click="addcart($event)" class="addCart fr" data-source="1.0.0" data-id="{{item.ProductID}}"></span></p>
		</li>
		<li v-if="morepro" v-for="i in morepro">
		    <a v-link="{name: 'details', params: {id: i.ProductID}}">
				<img src="../../assets/images/default.jpg" data-lazyload="{{i.Pictures.split(',')[0] | qiniu '5' '345' '345'}}">
			    <p class="name c_666 f12" v-text="i.Subject"></p>
			</a>
		    <p class="price cle"><span class="fl f14" v-text="'&yen;&nbsp;' + i.FinalPrice"></span><span @click="addcart" class="addCart fr" data-source="1.0.0" data-id="{{i.ProductID}}"></span></p>
		</li>
	</ul>
	<div class="view-more" v-if="items.HasProductsFlag == 'Y'"><span data-cat="{{items.CategoryID}}" data-page="{{page}}" @click="getMore">查看更多</span></div>
	<div class="view-more" v-else v-show="moreshow"><span class="loadmore">正在加载中...</span></div>
</div>
<add-cart :details.sync="details" :count.sync="count"></add-cart>
</template>
<script>
var imglazyload = require('imglazyload');
var tips = require('tips');
var arrData = [];
module.exports = {
	ready: function(){
		var that = this;
		var id = that.$route.params.id;
		that.$http.post('/api/mall/category-products', {MemberID: id})
			.then(
				function(res){
					if(res.data.flag == 1){
						that.product = res.data.data;
						that.loadimg();
					}
				},
				function(res){

				}
			)	
	},
	data: function(){
		return {
			product: '',
			details: '',
			morepro: '',
			moreshow: false,
			page: 1
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
		getMore: function(e){
			var that = this;
			var _this = $(e.currentTarget);
			var id = that.$route.params.id;
			var CategoryID = _this.data('cat');
			var ExceptProductID = [];
			var page = _this.data('page');

			that.moreshow = true;

			$.each(that.product,function(i,v){
				if(CategoryID == v.CategoryID){
					var arr = v.Products;
					v.HasProductsFlag = 'N';
					$.each(arr,function(j,k){
						ExceptProductID.push(k.ProductID);
					})

				}
			});

			that.$http.post('/api/mall/mall-products',{
				MemberID: id,
				page: page,
				pageSize: 10,
				CategoryID: CategoryID,
				ExceptProductID: ExceptProductID.join(',')
			})
			.then(
				function(res){
					if(res.data.flag == 1){

						$.each(res.data.data, function(i,v){
							arrData.push(v);
						});

						that.morepro = arrData;

						that.moreshow = false;
						$.each(that.product,function(i,v){
							if(CategoryID == v.CategoryID){
								if(res.data.extra.page * 10 < res.data.extra.total){
									v.HasProductsFlag = 'Y';
									that.page++;
								}else{
									v.HasProductsFlag = 'N';
								}
							}
						});

						that.loadimg();
					}
				},
				function(res){
				}
			)
		}
	},
    components: {
        'addCart': require('../public/addcart.vue')
    },
    props: ['count']
}	
</script>