<template>
<main class="d-flex">
	<div class="row col-2">
		<side-menu/>
	</div>
	<div class="row col-10">
		<router-view v-on:updateCurrentPath="updateCurrentPath"/>
	</div>
</main>
</template>
<script>
    import store from './stores/index.js'
	import SideMenu from './SideMenu.vue'
	export default {
		store,
		mounted() {
			console.log('Component "main-content" mounted.')
			console.log(this)
		},
		components: {
			'side-menu': SideMenu,
		},
		methods: {
			updateCurrentPath: (val) => {
				store.state.sideMenuData.currentPath = val
			}
		}
	}
</script>