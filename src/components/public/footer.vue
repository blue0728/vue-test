<template>
<div class="footer" v-if="shop">
	<ul>
		<li class="home"><a v-link="{name: 'home', params: {id: shop.MemberID}}">店铺</a></li>
		<li class="contact" v-if="islogin"><a v-link="{name: 'contact'}" target="_im">联系卖家</a></li>
		<li class="contact" v-else><a v-link="{name: 'login'}" target="_im">联系卖家</a></li>
		<li class="order" v-if="islogin"><a v-link="{name: 'order'}">订单</a></li>
		<li class="order" v-else><a v-link="{name: 'login'}">订单</a></li>
		<li class="person" v-if="islogin"><a v-link="{name: 'user'}">个人中心</a></li>
		<li class="person" v-else><a v-link="{name: 'login'}">个人中心</a></li>
	</ul>
</div>
</template>
<script>
module.exports = {
	ready: function(){
		var that = this;
		that.$http.post('/api/me/get-login-info')
			.then(
				function(res){
					if(res.data.flag == 1){
						that.islogin = true;
					}
					else if(res.data.flag == -100){
						that.islogin = false;
					}	
				}
			)
	},
	data: function(){
		return {
			islogin: false
		}
	},
	props: ['shop']
}		
</script>