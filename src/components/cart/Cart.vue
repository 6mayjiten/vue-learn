<template>
	<a-drawer title="Cart" class="has-text-centered" :width="420" :visible="visible"
		:body-style="{ paddingBottom: '80px' }" @close="onClose">
		<div v-if="cart.length < 1">
			<a-avatar :size="150" icon="shopping" class="mb-5 has-text-black" />
			<h4 class="title is-5">
				Cart Empty
			</h4>
		</div>
		<div v-else="">
			show cart data.
		</div>
	</a-drawer>
</template>
<script>
	import { mapState } from 'vuex';
    export default {
        name: 'Cart',
        props: {
            visible: Boolean,
        },
		computed: {
            ...mapState([
                'cart'
			])
		},
        methods:{
            onClose() {
                this.$emit('close');
            }
        },
    }
</script>
