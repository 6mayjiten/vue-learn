<template>
	<div>
		<Header />
		<router-view />
		<Footer />
	</div>
</template>

<script>

import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
export default {
	components: {Footer, Header}
}

</script>
