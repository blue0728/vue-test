<template>
<div v-if="shop" class="evaluate arrows-right">
	<a v-link="{name: 'evaluate', params: {id: shop.MemberID} }">
		<span class="fl f14">评价综合评分</span>
		<div class="fl evaluate-star evaluate-star-null">
			<div class="evaluate-star-control" :style="{width: shop.ProductScore / 5 * 100 + '%'}">
				<div class="evaluate-star evaluate-star-full"></div>
			</div>
		</div>
		<span class="fl f14 c_999" v-text="'评价共' + shop.ReviewCount + '条'"></span>
	</a>
</div>	
</template>
<script>
module.exports = {
	props: ['shop']
}	
</script>