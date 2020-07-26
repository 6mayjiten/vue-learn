<template>
	<nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
		<div class="navbar-brand">
			<router-link class="navbar-item" to="/">
				<img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
			</router-link>

			<a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample"
				@click="showNav = !showNav">
				<span aria-hidden="true" />
				<span aria-hidden="true" />
				<span aria-hidden="true" />
			</a>
		</div>
		<div :class="{'navbar-menu':true, 'is-active':showNav}">
			<div class="navbar-end">
				<router-link class="navbar-item" to="/">
					<span class="icon mr-1">
						<i class="fa fa-home fa-lg" />
					</span>Home
				</router-link>

				<router-link class="navbar-item" to="/collection">
					<span class="icon mr-1">
						<i class="fa fa-cube fa-lg" />
					</span>Products
				</router-link>
			</div>

			<div class="navbar-end mr-6">
				<div class="navbar-item">
					<div class="container">
						<a-badge v-if="token && isLoggedIn" class="mr-5">
							<a-dropdown>
								<a class="ant-dropdown-link" @click.prevent="">
									<i class="fa fa-user-circle fa-lg" />
								</a>
								<a-menu slot="overlay" class="mt-3 user-data-dropdown">
									<a-menu-item key="0">
										Hi, {{ user.first_name }} {{ user.last_name }}
									</a-menu-item>
									<a-menu-item key="1" @click="showUpdateProfile">
										<a-icon type="form" />Edit Profile
									</a-menu-item>
									<a-menu-item key="2" @click="showAddress">
										<a-icon type="home" />My Addresses
									</a-menu-item>
									<a-menu-item key="3">
										<a-icon type="code-sandbox" />My Order
									</a-menu-item>
									<a-divider />
									<a-menu-item key="2" @click="logoutUser">
										<a-icon type="poweroff" /> Logout
									</a-menu-item>
								</a-menu>
							</a-dropdown>
						</a-badge>

						<a-badge v-if="!isLoggedIn || !token" class="mr-5" @click="showLoginDrawer">
							<i class="fa fa-user-circle fa-lg" />
						</a-badge>

						<a-badge :count="cart.length" :show-zero="true" @click="showCartDrawer">
							<i class="fa fa-shopping-bag fa-lg" />
						</a-badge>
					</div>
				</div>
			</div>
		</div>
		<Cart :visible="isCartVisible" @close="closeAllDrawer" />
		<div v-if="!isLoggedIn || !token">
			<Login :visible="isLoginVisible" @close="closeAllDrawer" @show-sign-up-drawer="showRegisterDrawer" />
			<SignUp :visible="isRegisterVisible" @close="closeAllDrawer" @show-login-drawer="showLoginDrawer" />
		</div>
		<div v-if="isLoggedIn && token">
			<UserProfile :visible="isUpdateProfileVisible" @close="closeAllDrawer" />
			<UserAddress :visible="isAddressVisible" @close="closeAllDrawer" />
		</div>
	</nav>
</template>

<script>
	import {mapState, mapActions } from 'vuex';
	import Cart from '@/components/cart/Cart';
	import Login from '@/components/user/Login';
	import SignUp from '@/components/user/SignUp';
    import UserProfile from '@/components/profile/UserProfile';
    import UserAddress from '@/components/profile/UserAddress';
	export default {
		name: 'Header',
		components: {
            UserAddress,
            UserProfile,
            SignUp,
			Login,
			Cart
		},
		data: () => {
			return {
				showNav: false,
				isCartVisible: false,
				isLoginVisible: false,
				isRegisterVisible: false,
                isUpdateProfileVisible: false,
				isAddressVisible: false,
			};
		},
        computed: {
            ...mapState([
                'token',
                'isLoggedIn',
				'cart',
				'user'
            ])
        },
		methods:{
			...mapActions([
				'logout'
			]),
			showCartDrawer() {
				this.isCartVisible = true;
			},
			showLoginDrawer() {
				this.isLoginVisible = true;
			},
			showRegisterDrawer() {
				this.isRegisterVisible = true;
			},
            showUpdateProfile(){
				this.isUpdateProfileVisible = true;
			},
            showAddress(){
                this.isAddressVisible = true;
            },
			closeAllDrawer() {
				this.isCartVisible = false;
				this.isLoginVisible = false;
				this.isRegisterVisible = false;
				this.isUpdateProfileVisible = false;
				this.isAddressVisible = false;
			},
			logoutUser() {
				this.logout().then(()=>{
                    this.$notification['success']({
                        message: 'Success',
                        description: 'Logged Out Successfully',
                        duration: 3.5,
                        class: 'success-notification'
                    });
				});
			},
		}
	};
</script>

<style scoped></style>
