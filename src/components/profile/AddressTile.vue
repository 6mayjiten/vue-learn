<template>
	<a-card hoverable class="column mr-6 ml-6">
		<template slot="actions" class="ant-card-actions">
			<a-icon key="edit" type="edit" @click="editAddress(address._id)" />
			<a-icon key="delete" type="delete" @click="deleteAddress(address._id)" />
		</template>
		<a-card-meta v-if="address.street_number" :title="address.street_number" />
		<a-card-meta :title="address.street_name" :description="address.city + ' ' +address.province" />
		<a-card-meta :description="address.country + ', ' +address.postal_code" />
		<a-card-meta v-if="address.mobile_number" :description="'Mobile: '+address.mobile_number" />
	</a-card>
</template>

<script>
    export default {
        name: 'AddressTile',
		props: {
            address: {type: Object, default: null}
		},
		methods: {
            editAddress(addressId){
                this.$emit('edit-address', {addressId: addressId});
			},
            deleteAddress(addressId){
                this.$emit('delete-address', {addressId: addressId});
            }
		}
    }
</script>

<style scoped>

</style>
