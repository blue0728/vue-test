<template>
<li v-if="morepro" v-for="item in morepro" id="tag-{{item.ProductID}}">
    <a v-link="{name: 'details', params: {id: item.ProductID}}">
		<img src="../../assets/images/default.jpg" data-lazyload="{{item.Pictures.split(',')[0] | qiniu '5' '345' '345'}}">
	    <p class="name c_666 f12" v-text="item.Subject"></p>
	</a>
    <p class="price cle"><span class="fl f14" v-text="'&yen;&nbsp;' + item.FinalPrice"></span><span @click="addcart" class="addCart fr" data-source="1.0.0" data-id="{{item.ProductID}}"></span></p>
</li>
</template>
<script>
module.exports = {
	props: ['morepro']
}		
</script>