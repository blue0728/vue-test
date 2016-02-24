<template>
	<hd :shop.sync="shop" :verify.sync="verify"></hd>
	<score :shop.sync="shop"></score>
	<notice :shop.sync="shop"></notice>
	<favorable></favorable>
	<product :count.sync="count"></product>
	<cart :count.sync="count"></cart>
	<foot :shop.sync="shop"></foot>	
</template>
<script>
require('../assets/css/index.css');
module.exports = {
	ready: function(){
		var that = this;
		var id = that.$route.params.id;
		localStorage.id = id;
		that.$http.post('/api/member/seller-profile-cdn',{MemberID: id})
			.then(
				function(res){
					if(res.data.flag == 1){
						that.shop = res.data.data;
						that.verify = Global;
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
	},
	data: function(){
		return {
			shop: '',
			verify: '',
			count: ''
		}
	},
    components: {
        'hd': require('../components/index/header.vue'),
        'score': require('../components/index/score.vue'),
        'notice': require('../components/index/notice.vue'),
        'favorable': require('../components/index/favorable.vue'),
        'product': require('../components/index/product.vue'),
        'cart': require('../components/public/cart.vue'),
        'foot': require('../components/public/footer.vue')
    }
}
</script>