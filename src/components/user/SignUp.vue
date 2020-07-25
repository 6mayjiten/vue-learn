<template>
	<a-drawer title="Register" class="has-text-centered" :width="420" :visible="visible"
		:body-style="{ paddingBottom: '80px' }" :destroy-on-close="true" @close="onClose">
		<a-spin :spinning="isSpinning" size="large">
			<a-avatar :size="150" icon="user-add" class="mb-5 has-text-black" />
			<a-form :form="form" class="login-form" @submit="handleSubmit">
				<a-row :gutter="10">
					<a-col :span="12">
						<a-form-item label="First Name" class="has-text-left">
							<a-input
								v-decorator="[
									'first_name',
									{
										rules: [{ required: true, message: 'Please enter first name!' }],
									},
								]"
								placeholder="First name" />
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="Last name" class="has-text-left">
							<a-input
								v-decorator="[
									'last_name',
									{
										rules: [{ required: true, message: 'Please enter last name!' }],
									},
								]"
								style="width: 100%"
								placeholder="Last name" />
						</a-form-item>
					</a-col>
				</a-row>
				<a-form-item label="Mobile" class="has-text-left">
					<a-input
						v-decorator="[
							'mobile_number',
							{ rules: [
								{ required: true, message: 'Please input valid mobile!' },
								{ len:10, message: 'Please input 10 digit valid mobile!'},
							] },
						]"
						placeholder="Mobile Number">
						<a-icon slot="prefix" type="mobile" style="color: rgba(0,0,0,.25)" />
					</a-input>
				</a-form-item>
				<a-form-item label="Email" class="has-text-left">
					<a-input
						v-decorator="[
							'email',
							{ rules: [
								{ required: true, message: 'Please input your email!' },
								{ type: 'email', message: 'Please input valid email!'}
							] },
						]"
						placeholder="Email">
						<a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
					</a-input>
				</a-form-item>
				<a-row :gutter="10">
					<a-col :span="12">
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
					</a-col>
					<a-col :span="12">
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
					</a-col>
				</a-row>
				<a-form-item class="mt-3">
					<div class="field is-grouped is-grouped-centered">
						<p class="control">
							<button type="submit" class="button has-text-white has-background-primary">
								Register
							</button>
						</p>
						<p class="control">
							<a href="" class="button is-light" @click.prevent="showLoginDrawer">
								Login Now!
							</a>
						</p>
					</div>
				</a-form-item>
			</a-form>
		</a-spin>
	</a-drawer>
</template>
<script>
    import { mapActions } from 'vuex';
    import { mapState } from 'vuex';

    export default {
        name: 'SignUp',
        props: {
            visible: Boolean,
        },
		data: () => {
			return{
                passwordMatchErr: false,
			}
		},
        computed: {
            ...mapState([
                'isSpinning'
            ])
        },
        beforeCreate() {
            this.form = this.$form.createForm(this, { name: 'sign_up_form' });
        },
        methods:{
            ...mapActions([
                'signup'
            ]),
            onClose() {
                this.$emit('close');
            },
			showLoginDrawer() {
				this.onClose();this.$emit('show-login-drawer');
			},
			handleSubmit(e) {
                this.passwordMatchErr = false;
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        if(values.confirm_password !== values.password){
                            this.passwordMatchErr = true;
                            return;
                        }
                        this.signup(values).then( (res) => {
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
        },
    }
</script>
