<template>
	<a-drawer title="Cart" class="has-text-centered" :width="420" :visible="visible"
		:body-style="{ paddingBottom: '80px' }" @close="onClose">
		<h4 class="title is-5">
			Cart Empty
		</h4>
	</a-drawer>
</template>
<script>
    export default {
        name: 'Cart',
        props: {
            visible: Boolean,
        },
        methods:{
            onClose() {
                this.$emit('close');
            }
        },
    }
</script>
