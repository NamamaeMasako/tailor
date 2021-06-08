<template>
<div id="app">
	<router-view />
    <footer-nav />
</div>
</template>

<script>
import FooterNav from './components/_base/footerNav.vue'

export default {
	name: 'App',
	components: {
        'footer-nav': FooterNav
	},
	created(){
		localStorage.setItem('HOST','http://tailor.backend:8080/')
	}
}
</script>
