<template>
	<a-drawer :title="title" class="has-text-centered" width="420" :visible="visible"
		:body-style="{ paddingBottom: '80px' }" :destroy-on-close="true" @close="onClose">
		<a-avatar :size="150" icon="home" class="mb-5 has-text-black" />
		<a-spin :spinning="isSpinning" size="large">
			<a-form-model ref="addressForm" class="profile-form" :rules="rules" :model="addressInfo">
				<a-form-model-item label="Street Number" class="has-text-left" prop="street_number">
					<a-input v-model="addressInfo.street_number" placeholder="Street Number" />
				</a-form-model-item>
				<a-form-model-item label="Street Name" class="has-text-left" prop="street_name">
					<a-input v-model="addressInfo.street_name" placeholder="Street Name" />
				</a-form-model-item>
				<a-row :gutter="10">
					<a-col :span="12">
						<a-form-model-item label="City" class="has-text-left" prop="city">
							<a-input v-model="addressInfo.city" placeholder="City" />
						</a-form-model-item>
					</a-col>
					<a-col :span="12">
						<a-form-model-item label="Province" class="has-text-left" prop="province">
							<a-input v-model="addressInfo.province" style="width: 100%" placeholder="Province" />
						</a-form-model-item>
					</a-col>
				</a-row>
				<a-row :gutter="10">
					<a-col :span="12">
						<a-form-model-item label="Country" class="has-text-left" prop="country">
							<a-input v-model="addressInfo.country" placeholder="Country" />
						</a-form-model-item>
					</a-col>
					<a-col :span="12">
						<a-form-model-item label="Postal Code" class="has-text-left" prop="postal_code">
							<a-input v-model="addressInfo.postal_code" style="width: 100%" placeholder="Postal Code" />
						</a-form-model-item>
					</a-col>
				</a-row>
				<a-form-model-item label="Mobile Number" class="has-text-left" prop="mobile_number">
					<a-input v-model="addressInfo.mobile_number" placeholder="Mobile Number" />
				</a-form-model-item>
				<a-form-item class="mt-3">
					<div class="field is-grouped is-grouped-centered">
						<p class="control">
							<button type="submit" class="button has-text-white has-background-primary" @click="handleSubmit">
								Submit
							</button>
						</p>
					</div>
				</a-form-item>
			</a-form-model>
		</a-spin>
	</a-drawer>
</template>

<script>
    import { mapActions, mapState } from 'vuex';

    export default {
        name: 'AddAddress',
        props: {
            visible: Boolean,
			addressId: {type: String, default: null}
        },
        data() {
            return{
                rules: {
                    street_name:[{ required: true, message: 'Please enter street name!' }],
                    city: [{ required: true, message: 'Please enter city name!' }],
                    province: [{ required: true, message: 'Please enter province name!' }],
					country: [{ required: true, message: 'Please enter country name!' }],
                    postal_code: [{ required: true, message: 'Please enter postal code!' },
                        { len:6, message: 'Please input valid postal code!' }],
					mobile_number: [{ len:10, message: 'Please input valid mobile number!' }]
                },
                addressInfo: {
                        street_number: '',
                        street_name: '',
                        city: '',
                        province: '',
                        country: '',
                        postal_code: '',
                        mobile_number: ''
                },
            }
        },
        computed: {
            ...mapState([
                'isSpinning',
                'addresses'
            ]),
        },
		created() {
			if(this.addressId) {
				const address = this.addresses.filter(add => add._id === this.addressId);
				this.addressInfo = {...address};
			}
		},
        methods: {
            ...mapActions([
                'addAddress','updateAddress'
            ]),
			title() {
                return this.addressId?'Update Address':'Add Address'
			},
            onClose() {
                this.$refs.addressForm.resetFields();
                this.$emit('close-update-address');
            },
            handleSubmit(e) {
                e.preventDefault();
                this.$refs.addressForm.validate(valid => {
                    if (valid) {
                        if(this.addressId){
                            this.updateAddress(this.addressInfo).then(() => {
                                this.openNotification('success', 'Success', 'Address Updated Successfully!');
                            }).catch((err) => {
                                this.openNotification('error', 'Error',err);
                            });
						}else{
                            this.addAddress(this.addressInfo).then(() => {
                                this.openNotification('success', 'Success', 'Address Added Successfully!');
                                this.onClose();
                            }).catch((err) => {
                                this.openNotification('error', 'Error',err);
                            });
						}
                    } else {
                        return false;
                    }
                });
            },
            openNotification(type, title, message) {
                this.$notification[type]({
                    message: title,
                    description: message,
                    duration: type == 'success'?4.5:0,
                    class: type == 'success'?'success-notification?':'error-notification'
                });
            },
        }
    }
</script>

