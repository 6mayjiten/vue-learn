<template>
	<nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
		<div class="navbar-brand">
			<a class="navbar-item" href="/">
				<img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
			</a>

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
							<i class="fa fa-user-circle fa-lg" />
						</a-badge>

						<a-badge v-if="!isLoggedIn || !token" class="mr-5" @click="showLoginDrawer">
							<i class="fa fa-user-circle fa-lg" />
						</a-badge>

						<a-badge :count="count" :show-zero="true" @click="showCartDrawer">
							<i class="fa fa-shopping-bag fa-lg" />
						</a-badge>
					</div>
				</div>
			</div>
		</div>

		<Cart :visible="isCartVisible" @close="closeAllDrawer" />
		<Login :visible="isLoginVisible" @close="closeAllDrawer" @show-sign-up-drawer="showRegisterDrawer" />
		<SignUp :visible="isRegisterVisible" @close="closeAllDrawer" @show-login-drawer="showLoginDrawer" />
	</nav>
</template>

<script>
	import {mapState} from 'vuex';
	import Cart from '@/components/cart/Cart';
	import Login from '@/components/user/Login';
	import SignUp from '@/components/user/SignUp';
	export default {
		name: 'Header',
		components: {SignUp, Login, Cart},
		data: () => {
			return {
				showNav: false,
				isCartVisible: false,
				isLoginVisible: false,
				isRegisterVisible: false
			};
		},
        computed: {
            ...mapState([
                'count',
                'token',
                'isLoggedIn'
            ])
        },
		methods:{
			showCartDrawer() {
				this.isCartVisible = true;
			},
			showLoginDrawer() {
				this.isLoginVisible = true;
			},
			showRegisterDrawer() {
				this.isRegisterVisible = true;
			},
			closeAllDrawer() {
				this.isCartVisible = false;
				this.isLoginVisible = false;
				this.isRegisterVisible = false;
			}
		}
	};
</script>

<style scoped></style>
