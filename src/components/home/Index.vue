<template>
	<div id="app">
		<Hero />
		<img alt="Vue logo" src="../../assets/logo.png">
		<HelloWorld />
	</div>
</template>

<script>
	import HelloWorld from '@/components/home/HelloWorld';
	import Hero from '@/components/home/Hero';
	export default {
		components: {
			Hero,
			HelloWorld,
		}
	}
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
    }
</style>
