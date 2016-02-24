<template>
<div v-if="shop" class="header">
    <a v-link="{name: 'category', params: {id: shop.MemberID} }" class="cate-btn fr"></a>
    <a v-link="{name: 'search', params: {id: shop.MemberID} }" class="search-btn fr"></a>
</div>
<div v-if="shop" class="profile-info" :style="{backgroundImage: 'url(' + shop.Background + ')'}">
    <img class="profile-info-avatar" :src="shop.Avatar">
    <p class="profile-info-mallname f12 c_fff" v-text="shop.MallName"></p>
    <p class="profile-info-location f10 c_fff" v-text="shop.Country"></p>
    <p class="profile-info-level" v-show="shop.LevelPicture"><img :src="shop.LevelPicture"></p>
    <span class="profile-info-collect" v-show="verify.wx"></span>
</div>
</template>
<script>
module.exports = {
	props: ['shop','verify']
}	
</script>