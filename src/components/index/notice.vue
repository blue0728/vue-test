<template>
<div class="notice" v-if="shop.Notice"><a class="f14 c_999" v-link="{name: 'notice', params: {id: shop.MemberID} }" v-text="shop.Notice"></a></div>
</template>
<script>
module.exports = {
	props: ['shop']
}		
</script>