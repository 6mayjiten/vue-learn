<template>
	<a-spin :spinning="isLoading" size="large">
		<Header />
		<router-view />
		<Footer />
	</a-spin>
</template>

<script>

import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import {mapState} from 'vuex';

export default {
	components: {Footer, Header},
    data: () => {
        return {
        };
    },
	computed: {
		...mapState([
            'isLoading',
		])
	}
}

</script>
