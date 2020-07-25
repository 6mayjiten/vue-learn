<template>
	<a-drawer title="Login" class="has-text-centered" :width="420" :visible="visible"
		:body-style="{ paddingBottom: '80px' }" :destroy-on-close="true" @close="onClose">
		<a-spin :spinning="isSpinning" size="large">
			<a-avatar :size="150" icon="user" class="mb-5 has-text-black" />
			<a-form
				:form="form"
				class="login-form"
				@submit="handleSubmit">
				<a-form-item>
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
				<a-form-item>
					<a-input
						v-decorator="[
							'password',
							{ rules: [
								{ required: true, message: 'Please input your Password!' },
							] },
						]"
						type="password"
						placeholder="Password">
						<a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
					</a-input>
				</a-form-item>
				<a-form-item>
					<div class="field is-grouped is-grouped-centered">
						<p class="control">
							<button type="submit" class="button has-text-white has-background-primary">
								Log in
							</button>
						</p>
						<p class="control">
							<a href="" class="button is-light" @click.prevent="callShowRegisterDrawer">
								Register Now!
							</a>
						</p>
					</div>
					<a class="login-form-forgot is-light" href="" @click.prevent="onShowForgetPassword">
						Forgot password
					</a>
				</a-form-item>
			</a-form>
			<ForgetPassword :visible="isForgetPasswordVisible" @close-forget-password="onForgetPasswordClose" />
		</a-spin>
	</a-drawer>
</template>
<script>
    import ForgetPassword from '@/components/user/ForgetPassword';
    import { mapActions } from 'vuex';
    import { mapState } from 'vuex';

    export default {
        name: 'Login',
        components: {ForgetPassword},
        props: {
            visible: Boolean,
        },
		data: () => {
            return {
                isForgetPasswordVisible: false,
            }
        },
		computed: {
            ...mapState([
                'isSpinning'
            ])
		},
		beforeCreate() {
			this.form = this.$form.createForm(this, { name: 'login_form' });
		},
        methods:{
            ...mapActions([
                'login'
            ]),
            onClose() {
                this.$emit('close');
            },
			callShowRegisterDrawer() {
				this.onClose();
				this.$emit('show-sign-up-drawer');
			},
			onShowForgetPassword(){
				this.isForgetPasswordVisible = true;
			},
            onForgetPasswordClose(){
                this.isForgetPasswordVisible = false;
            },
			handleSubmit(event) {
                event.preventDefault();
				this.form.validateFields((err, values) => {
					if (!err) {
						this.login(values).then( () => {
							this.openNotification('success', 'Success','Account loggedIn successfully.');
							this.onClose();
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
					duration: type == 'success'?3.5:0,
					class: type == 'success'?'success-notification':'error-notification'
                });
            },
        },
    }
</script>
