<template>
	<a-drawer title="Update Password" class="has-text-centered" width="420" :visible="visible"
		:body-style="{ paddingBottom: '80px' }" :destroy-on-close="true" @close="onClose">
		<a-avatar :size="150" icon="lock" class="mb-5 has-text-black" />
		<a-spin :spinning="isSpinning" size="large">
			<a-form :form="form" class="login-form" @submit="handleSubmit">
				<a-form-item label="Password" class="has-text-left">
					<a-input
						v-decorator="[
							'password',
							{ rules: [
								{ required: true, message: 'Please input your Password!' },
								{ type: 'string', pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
									message: 'Password at least 8 char long and must contain at least 1 digit, 1 lower case and 1 upper ' +
										'case letter with 1 special char(!@#$%^&*)'}
							] },
						]"
						type="password"
						placeholder="Password">
						<a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
					</a-input>
				</a-form-item>
				<a-form-item label="Confirm Password" class="has-text-left">
					<a-input
						v-decorator="[
							'confirm_password',
							{ rules: [
								{ required: true, message: 'Please input Confirm Password!' },
							]},
						]"
						placeholder="Confirm Password"
						style="width: 100%"
						type="password">
						<a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
					</a-input>
					<span v-if="passwordMatchErr" class="has-text-danger"> Password and Confirm Password did not match!</span>
				</a-form-item>
				<a-form-item class="mt-3">
					<div class="field is-grouped is-grouped-centered">
						<p class="control">
							<button type="submit" class="button has-text-white has-background-primary">
								Update Password
							</button>
						</p>
					</div>
				</a-form-item>
			</a-form>
		</a-spin>
	</a-drawer>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
    export default {
        name: 'UpdatePassword',
		props: {
            visible: Boolean
		},
		data: () => {
            return {
                passwordMatchErr: false,
			}
		},
		computed: {
            ...mapState([
                'isSpinning'
			]),
		},
        beforeCreate() {
            this.form = this.$form.createForm(this, { name: 'update_password_form' });
        },
		methods: {
            ...mapActions([
                'updatePassword'
			]),
            onClose() {
                this.$emit('close-update-password');
            },
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        if(values.confirm_password !== values.password){
                            this.passwordMatchErr = true;
                            return;
                        }
                        this.forgetPassword(values).then( (res) => {
                            if(res){
                                this.openNotification('success', 'Success',res);
                            }
                        }).catch((e) => {
                            this.openNotification('error', 'Error',e);
                        });
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

<style scoped>

</style>
