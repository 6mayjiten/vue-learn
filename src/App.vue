<template>
	<div>
		<Header />
		<router-view />
	</div>
</template>

<script>

import Header from '@/components/common/Header';
export default {
	components: {Header}
}

</script>
