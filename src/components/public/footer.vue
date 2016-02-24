<template>
<div class="footer" v-if="shop">
	<ul>
		<li class="home"><a v-link="{name: 'home', params: {id: shop.MemberID}}">店铺</a></li>
		<li class="contact" ><a v-link="{name: 'contact'}" target="_im">联系卖家</a></li>
		<li class="order"><a v-link="{name: 'order'}">订单</a></li>
		<li class="person"><a v-link="{name: 'user'}">个人中心</a></li>
	</ul>
</div>
</template>
<script>
module.exports = {
	props: ['shop']
}		
</script>