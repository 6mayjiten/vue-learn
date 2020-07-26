<template>
	<a-drawer title="Address" class="has-text-centered" width="420" :visible="visible"
		:body-style="{ paddingBottom: '80px' }" :destroy-on-close="true" @close="onClose">
		<a-avatar :size="150" icon="home" class="mb-5 has-text-black" />
		<a-spin :spinning="isSpinning" size="large">
			<div v-for="(address, index) in addresses" :key="index" class="container mb-4">
				<AddressTile :address="address" @edit-address="onEditAddress" @delete-address="onDeleteAddress" />
			</div>
			<a href="" class="button is-primary" @click.prevent="showUpdateAddressDrawer">
				Add New Address
			</a>
		</a-spin>
		<AddAddress ref="updateAddress" :visible="isUpdateAddressVisible" @close-update-address="onUpdateAddressClose" />
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
        beforeMount(){
            if(this.addresses.length < 1) {
                this.getUserAddress().then().catch(() => this.openNotification('error', 'Error', 'Problem in getting Address.'));
            }
        },
		methods: {
            ...mapActions([
                'getUserAddress',
				'deleteAddress'
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
            onEditAddress(event){
                this.$refs.updateAddress.setAddress(event.addressId);
                this.isUpdateAddressVisible = true;
			},
			onDeleteAddress(event) {
                this.deleteAddress(event.addressId).then(()=> {
                        this.openNotification('success', 'Success', 'Address Deleted Successfully.')
				})
				.catch(() => this.openNotification('error', 'Error', 'Problem in deleting Address.'));
            },
            openNotification(type, title, message) {
                this.$notification[type]({
                    message: title,
                    description: message,
                    duration: type == 'success'?4.5:0,
                    class: type == 'success'?'success-notification?':'error-notification'
                });
            },
        },
    }
</script>

<style scoped>

</style>
