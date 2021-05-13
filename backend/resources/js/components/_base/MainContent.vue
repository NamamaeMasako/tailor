<template>
<main class="d-flex">
	<div class="row col-2">
		<side-menu/>
	</div>
	<div class="row col-10">
		<router-view/>
	</div>
</main>
</template>
<script>
	import SideMenu from './SideMenu.vue'
	export default {
		mounted() {
			console.log('Component "main-content" mounted.')
		},
		components: {
			'side-menu': SideMenu,
		}
	}
</script>