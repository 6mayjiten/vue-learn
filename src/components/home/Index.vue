<template>
	<div id="app">
		<img alt="Vue logo" src="../../assets/logo.png">
		<HelloWorld msg="This is message" />
	</div>
</template>

<script>
import HelloWorld from '@/components/home/HelloWorld';
export default {
	components: {
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
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
