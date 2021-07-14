<template>
<div id="app">
	<router-view v-on:updateCurrentPath="updateCurrentPath"/>
    <footer-nav />
</div>
</template>

<script>
import store from './components/_base/_stores/app.js'
import FooterNav from './components/_base/footerNav.vue'

export default {
	store,
	name: 'App',
	components: {
        'footer-nav': FooterNav
	},
	created(){
		localStorage.setItem('HOST','http://tailor.backend:8080/')
	},
	methods: {
		updateCurrentPath: (val) => {
			store.state.footerNavData.currentPath = val
		}
	}
}
</script>
