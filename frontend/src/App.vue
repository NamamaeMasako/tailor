<template>
<div id="app" class="container-fluid">
	<router-view />
</div>
</template>

<script>

export default {
	name: 'App',
	components: {
	},
	created(){
		localStorage.setItem('HOST','http://tailor.backend:8080/')
	}
}
</script>
