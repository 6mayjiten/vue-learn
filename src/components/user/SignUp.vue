<template>
	<a-drawer title="Register" class="has-text-centered" :width="420" :visible="visible"
		:body-style="{ paddingBottom: '80px' }" @close="onClose">
		<a-form :form="form" class="login-form" @submit="handleSubmit">
			<a-row :gutter="16">
				<a-col :span="12">
					<a-form-item label="First Name" class="has-text-left">
						<a-input
							v-decorator="[
								'firstname',
								{
									rules: [{ required: true, message: 'Please enter first name' }],
								},
							]"
							placeholder="first name" />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="Last name" class="has-text-left">
						<a-input
							v-decorator="[
								'lastname',
								{
									rules: [{ required: true, message: 'Please enter last name' }],
								},
							]"
							style="width: 100%"
							placeholder="last name" />
					</a-form-item>
				</a-col>
			</a-row>
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
						'confirm password',
						{ rules: [{ required: true, message: 'Please input Confirm Password!' }] },
					]"
					type="password"
					style="width: 100%"
					placeholder="Confirm Password">
					<a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
				</a-input>
			</a-form-item>
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
	</a-drawer>
</template>
<script>
    export default {
        name: 'SignUp',
        props: {
            visible: Boolean,
        },
		data: () => {
			return{
			}
		},
        beforeCreate() {
            this.form = this.$form.createForm(this, { name: 'sign_up_form' });
        },
        methods:{
            onClose() {
                this.$emit('close');
            },
			showLoginDrawer() {
				this.onClose();this.$emit('show-login-drawer');
			},
			handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                    }
                });
            },
        },
    }
</script>
