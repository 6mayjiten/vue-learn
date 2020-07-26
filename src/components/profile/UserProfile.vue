<template>
	<a-drawer title="Update Profile" class="has-text-centered" :width="420" :visible="visible"
		:body-style="{ paddingBottom: '80px' }" :destroy-on-close="true" @close="onClose">
		<a-spin :spinning="isSpinning" size="large">
			<a-avatar :size="150" icon="user-add" class="mb-5 has-text-black" />
			<a-form-model ref="profileForm" class="profile-form" :rules="rules" :model="profile">
				<a-row :gutter="10">
					<a-col :span="12">
						<a-form-model-item label="First Name" class="has-text-left" prop="first_name">
							<a-input v-model="profile.first_name" placeholder="First name">
								<a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
							</a-input>
						</a-form-model-item>
					</a-col>
					<a-col :span="12">
						<a-form-model-item label="Last name" class="has-text-left" prop="last_name">
							<a-input v-model="profile.last_name" style="width: 100%" placeholder="Last name">
								<a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
							</a-input>
						</a-form-model-item>
					</a-col>
				</a-row>
				<a-mentions :placeholder="user.email" disabled />
				<a-form-model-item label="Mobile Number" class="has-text-left" prop="mobile_number">
					<a-input v-model="profile.mobile_number" placeholder="Mobile Number">
						<a-icon slot="prefix" type="mobile" style="color: rgba(0,0,0,.25)" />
					</a-input>
				</a-form-model-item>
				<a-form-item class="mt-3">
					<div class="field is-grouped is-grouped-centered">
						<p class="control">
							<button type="submit" class="button has-text-white has-background-primary" @click="handleSubmit">
								Update Profile
							</button>
						</p>
						<p class="control">
							<a href="" class="button is-light" @click.prevent="showUpdatePassDrawer">
								Update Password
							</a>
						</p>
					</div>
				</a-form-item>
			</a-form-model>
			<UpdatePassword :visible="isUpdatePasswordVisible" @close-update-password="onUpdatePasswordClose" />
		</a-spin>
	</a-drawer>
</template>
<script>
    import { mapState, mapActions } from 'vuex';
    import UpdatePassword from '@/components/profile/UpdatePassword';

    export default {
        name: 'UserProfile',
        components: {UpdatePassword},
        props: {
            visible: Boolean,
        },
		data : () => {
            return{
				isUpdatePasswordVisible: false,
                rules: {
					first_name:[{ required: true, message: 'Please enter first name!' }],
					last_name: [{ required: true, message: 'Please enter last name!' }],
					mobile_number: [{ required: true, message: 'Please input valid mobile!' },
                        { len:10, message: 'Please input 10 digit valid mobile!'}],
				},
                profile: {
                    first_name: '',
                    last_name: '',
                    mobile_number: ''
				}
			}
		},
        computed: {
            ...mapState([
                'isSpinning',
				'user'
            ]),
        },
        created() {
            if(this.user) {
                this.profile = {...this.user};
            }
        },
        methods:{
            ...mapActions([
                'updateUserProfile',
            ]),
            onClose() {
                this.$refs.profileForm.resetFields();
                this.$emit('close');
            },
            showUpdatePassDrawer(){
				this.isUpdatePasswordVisible = true;
            },
            onUpdatePasswordClose(){
                this.isUpdatePasswordVisible = false;
            },
            handleSubmit(e) {
                e.preventDefault();
                this.$refs.profileForm.validate((valid) => {
                    if (valid) {
                        this.updateUserProfile(this.profile).then(() => {
                            this.openNotification('success', 'Success', 'Account Updated Successfully!');
                        }).catch((err) => {
                            this.openNotification('error', 'Error',err);
                        });
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
        },
    }
</script>
