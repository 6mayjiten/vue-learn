<template>
	<nav class="navbar" role="navigation" aria-label="main navigation">
		<div class="navbar-brand">
			<a class="navbar-item" href="https://bulma.io">
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
			<div class="navbar-start">
				<router-link class="navbar-item" to="/">
					Home
				</router-link>

				<router-link class="navbar-item" to="/collection">
					Products
				</router-link>
			</div>

			<div v-if="!isLoggedIn && !token" class="navbar-end">
				<div class="navbar-item">
					<div class="buttons">
						<router-link class="button is-primary" to="/login">
							<strong>Sign up</strong>
						</router-link>
						<router-link class="button is-light" to="/signup">
							Log in
						</router-link>
					</div>
				</div>
			</div>
			<div v-else-if="token && isLoggedIn">
				loggedIn
			</div>
		</div>
	</nav>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		name: 'Header',
		data: () => {
			return {
				showNav: false,
			};
		},
		computed: {
			...mapState([
				'token',
				'isLoggedIn'
			])
		}
	};
</script>

<style scoped></style>
