<template>
<main>
	<side-menu/>
    <div class="container-fluid">
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