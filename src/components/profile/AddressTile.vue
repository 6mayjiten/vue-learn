<template>
	<a-card hoverable class="column mr-6 ml-6">
		<template slot="actions" class="ant-card-actions">
			<a-icon key="edit" type="edit" />
			<a-icon key="delete" type="delete" />
		</template>
		<a-card-meta :title="address.street_name" :description="address.mobile_number" />
	</a-card>
</template>

<script>
    export default {
        name: 'AddressTile',
		props: {
            address: {type: Object, default: null}
		}
    }
</script>

<style scoped>

</style>
