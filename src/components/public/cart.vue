<template>
<a v-if="count" class="my-cart" v-link="{path: 'cart'}"><i v-if="count.Count > 0" v-text="count.Count"></i></a>
</template>	
<script>
module.exports = {
	props: ['count']
}	
</script>