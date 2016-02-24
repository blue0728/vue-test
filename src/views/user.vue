<style>
.person-name {height: 4.2rem;padding: .6rem .5rem;background: #fff;}
.person-name img {display: inline-block;width: 3rem;height: 3rem; margin-right: .5rem;vertical-align: top;border-radius: 100%;}
.person-name span {line-height: 3rem;display: inline-block;overflow: hidden; max-width: 10rem;height: 3rem;padding-right: 1rem; white-space: nowrap;text-overflow: ellipsis;background: url(../assets/images/no-def.png) right center no-repeat;background-size: .64rem;}
.perosn-boxs {margin-top: .5rem;margin-bottom: .75rem;background-color: #fff;}
.perosn-boxs li { position: relative;float: left;width: 33.333%;height: 5.5rem;}
.perosn-boxs li a {display: block;width: 100%;height: 5.5rem; background-repeat: no-repeat;background-position: center 1.1rem; background-size: 1.8rem;}
.perosn-boxs li a p {padding-top: 3.5rem;text-align: center;}
.perosn-boxs .order a {border-right: 1px solid #eee;border-bottom: 1px solid #eee;background-image: url(../assets/images/my-order-ico.png);}
.perosn-boxs .fav a { border-bottom: 1px solid #eee;background-image: url(../assets/images/my-collection-ico.png);}
.perosn-boxs .bonus a {border-right: 1px solid #eee;background-image: url(../assets/images/my-coupon-ico.png);}
.perosn-boxs .cart a {border-right: 1px solid #eee; border-bottom: 1px solid #eee;background-image: url(../assets/images/my-cart-ico.png);}
.perosn-boxs .myPinme a {border-right: 1px solid #eee;background-image: url(../assets/images/my-pinme-ico.png);}
.perosn-boxs .order i {font-size: .7rem;line-height: 1rem;position: absolute;top: 1rem; right: 2.5rem;display: inline-block;
min-width: 1rem;height: 1rem; padding: 0 .2rem; text-align: center;color: #fff;border-radius: 1rem;background-color: red;}
.whitebtn {line-height: 2.2rem; display: block;width: 100%;height: 2.2rem; text-align: center; background: #fff;}
.edit-name {width: 11rem;padding: .5rem 1rem;}
.edit-name h3 { line-height: 1rem; text-align: center;}
.edit-name input.NickName {width: 100%; padding: .3rem .2rem; text-align: center;border: 1px solid #eee;border-radius: 3px; background: #eee;}
.edit-name p {margin-top: .5rem; text-align: center;}
.person-name span.avatar-box {position: relative; display: inline-block;width: 3rem;height: 3rem; padding: 0; margin-right: 1rem; background: none;}
.person-name span.avatar-box input {position: absolute;z-index: 100;top: 0; left: 0; display: block;width: 3rem;height: 3rem;opacity: 0;}	
</style>
<template>
<div class="person-info-view" v-if="user">
	<div class="person-name">
        <span class="avatar-box"><input type="file" accept="image/*" class="avatar"/><img :src="user.Avatar | qiniu '5' '150' '150'"/></span><span class="f14" v-text="user.NickName"></span>
    </div>
	<ul class="perosn-boxs cle">
		<li class="order"><a href="/shop/order/list"><i v-if="total"></i><p class="f14 c_666">我的订单</p></a></li>
		<li class="cart"><a href="/shop/cart/my-cart"><p class="f14 c_666">购物车</p></a></li>
		<li class="fav"><a href="/shop/person/fav"><p class="f14 c_666">我的收藏</p></a></li>
		<li class="bonus"><a href="/shop/person/bonus"><p class="f14 c_666">红包优惠券</p></a></li>
		<li v-if="hasGroupon == 'Y'" class="myPinme"><a href="/wap/group/pinme-list/s/wshop"><p class="f14 c_666">我的团</p></a></li>
	</ul>
	<a href="javascript:;" class="whitebtn logout f16 c_666" >退出登陆</a>
	<foot :shop.sync="shop"></foot>
</div>	
</template>	
<script>
module.exports = {
	ready: function(){
		var that = this;	

		that.$http.post('/api/me/buyer-status')
			.then(
				function(res){
					if(res.data.flag == 1){
						that.user = res.data.data;
						that.user.total = parseFloat(res.data.data.EscrowWaitBuyerPayall) + parseFloat(res.data.data.EscrowWaitSellerShip) + parseFloat(res.data.data.EscrowTakeoverArgue) + parseFloat(res.data.data.EscrowWaitTakeover);
					}
				},
				function(res){

				}
			)

		that.$http.post('/api/Promotion/Has-groupon')
			.then(
				function(res){
					if(res.data.flag == 1){
						that.hasGroupon = res.data.data.has_groupon;
					}
				},
				function(res){

				}
			)	

	},
	data: function(){
		return {
			user: '',
			hasGroupon: 'N',
			shop: {
				MemberID: localStorage.id
			}
		}
	},
    components: {
        'foot': require('../components/public/footer.vue')
    }

}		
</script>