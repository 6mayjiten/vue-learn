<template>
	<a-drawer title="Forgot Password" class="has-text-centered" width="420" :visible="visible"
		:body-style="{ paddingBottom: '80px' }" @close="onClose">
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
	</a-drawer>
</template>

<script>
    export default {
        name: 'ForgetPassword',
        props: {
            visible: Boolean
        },
        data: () => {
            return{
            }
        },
        beforeCreate() {
            this.form = this.$form.createForm(this, { name: 'forget_password_form' });
        },
        methods: {
            onClose() {
                this.$emit('close-forget-password');
            },
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>
