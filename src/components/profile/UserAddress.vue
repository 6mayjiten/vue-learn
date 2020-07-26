<template>
	<a-drawer title="Address" class="has-text-centered" width="420" :visible="visible"
		:body-style="{ paddingBottom: '80px' }" :destroy-on-close="true" @close="onClose">
		<a-avatar :size="150" icon="home" class="mb-5 has-text-black" />
		<a-spin :spinning="isSpinning" size="large">
			<div v-for="(address, index) in addresses" :key="index" class="container mb-4">
				<AddressTile :address="address" />
			</div>
			<a href="" class="button is-primary" @click.prevent="showUpdateAddressDrawer">
				Add New Address
			</a>
		</a-spin>
		<AddAddress :address-id="addressToUpdate" :visible="isUpdateAddressVisible" @close-update-address="onUpdateAddressClose" />
	</a-drawer>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
    import AddAddress from '@/components/profile/AddAddress';
    import AddressTile from '@/components/profile/AddressTile';
    export default {
        name: 'UserAddress',
        components: {
            AddressTile,
            AddAddress},
        props: {
            visible: Boolean,
		},
        data : () => {
            return{
                isUpdateAddressVisible: false,
                addressToUpdate: null,
            }
        },
		computed: {
            ...mapState([
                'isSpinning',
                'addresses'
			])
		},
		methods: {
            ...mapActions([
                'getUserAddress'
			]),
			onClose() {
                this.$emit('close');
			},
            showUpdateAddressDrawer(){
                this.isUpdateAddressVisible = true;
            },
            onUpdateAddressClose(){
                this.isUpdateAddressVisible = false;
            },
		}
    }
</script>

<style scoped>

</style>
