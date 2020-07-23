<template>
	<div class="hello">
		<h1>
			{{ count }}
		</h1>
		<button class="button is-success" @click="increment">
			Increment
		</button>
		<button class="button is-danger" @click="decrement">
			Decrement
		</button>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
	computed: {
		...mapState([
			'count'
		]),
		...mapGetters([
			'doneCount'
		])
	},
	methods: {
		...mapActions([
			'increment',
			'decrement'
		]),
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h3 {
		margin: 40px 0 0;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	a {
		color: #42b983;
	}
</style>
