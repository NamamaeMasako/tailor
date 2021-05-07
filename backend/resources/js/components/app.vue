<template>
	<div id="app">
		<header-nav/>
		<main-content/>
		<footer-nav/>
	</div>
</template>

<script>
	import HeaderNav from './_base/HeaderNav.vue'
	import MainContent from './_base/MainContent.vue'
	import FooterNav from './_base/FooterNav.vue'

	export default {
		mounted() {
			console.log('Component "app" mounted.')
		},
		components: {
			'header-nav': HeaderNav,
			'main-content': MainContent,
			'footer-nav': FooterNav
		}
	}
</script>
