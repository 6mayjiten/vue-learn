<template>
	<a-drawer title="Forgot Password" class="has-text-centered" width="420" :visible="visible"
		:body-style="{ paddingBottom: '80px' }" :destroy-on-close="true" @close="onClose">
		<a-avatar :size="150" icon="question" class="mb-5 forget-icon" />
		<a-spin :spinning="isSpinning" size="large">
			<a-form :form="form" class="login-form" @submit="handleSubmit">
				<a-form-item label="Email" class="has-text-left">
					<a-input
						v-decorator="[
							'email',
							{ rules: [
								{ required: true, message: 'Please input your email!' },
								{ type: 'email', message: 'Please input valid email!'}
							] },
						]"
						placeholder="email">
						<a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
					</a-input>
				</a-form-item>
				<a-form-item class="mt-3">
					<div class="field is-grouped is-grouped-centered">
						<p class="control">
							<button type="submit" class="button has-text-white has-background-primary">
								Submit
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
        name: 'ForgetPassword',
        props: {
            visible: Boolean
        },
        data: () => {
            return{
            }
        },
		computed: {
			...mapState([
				'isSpinning'
			])
		},
        beforeCreate() {
            this.form = this.$form.createForm(this, { name: 'forget_password_form' });
        },
        methods: {
            ...mapActions([
                'forgetPassword',
            ]),
            onClose() {
                this.$emit('close-forget-password');
            },
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        this.forgetPassword(values).then( (res) => {
                            if(res){
                                this.openNotification('success', 'Success',res);
                            }
                        }).catch((err) => {
                            this.openNotification('error', 'Error',err);
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
