<template>
<div class="bonus" v-if="coupons">
	<div class="bonus_box">
		<ul class="clearfix">
			<li @click="getCoupons" v-for="item in coupons" class="getCoupon" :class="{'disabled': (item.Counts != 0 && (item.Counts - item.GetTotals) <= 0)}" data-id="{{item.ActivityID}}">
				<p><strong v-text="item.Amount | parseint"></strong>元</p>
				<p class="couponLimit f10">
					<span v-if="item.BonusType == 'BONUS'">无限制</span>
					<span v-else>满{{item.LimitAmount | parseint}}元使用</span>
				</p>
			</li>
		</ul>
	</div>
</div>
</template>
<script>
var tips = require('tips');
module.exports = {
	ready: function(){
		var that = this;
		var id = that.$route.params.id;
		that.$http.post('/api/shop-activity/promolist', {MemberID: id})
			.then(
				function(res){
					if(res.data.flag == 1){
						that.coupons = res.data.data;
					}
				},
				function(res){

				}
			)
	},
	data: function(){
		return {
			coupons: ''
		}
	},
	methods: {
		getCoupons: function(e){
			var that = this;
			var $this = $(e.currentTarget);
			var id = $this.data('id');

			if($this.hasClass('disabled')){
				return;
			}
				
			var loading = tips.loading();

			that.$http.post('/api/shop-activity/getpromo/ActivityID',{ActivityID: id})
				.then(
					function(res){
						if(res.data.flag == 1){
							tips.msg(res.data.msg);
						}else if(res.data.flag == -100){
							location.href = '#!/login';
						}else{
							tips.msg(res.data.msg);
						}

						loading.close();
					},
					function(res){
						loading.close();
					}
				)
		}
	}
}	
</script>