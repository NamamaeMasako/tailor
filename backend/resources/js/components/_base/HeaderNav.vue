<template>
<nav class="bg-info">
    <div class="navbar navbar-expand-lg navbar-light shadow h-100">
        <a href="#" class="navbar-brand">
            Tailor
            <!-- <img src="" class="w-100 h-100" alt="logo"> -->
        </a>
        <button class="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#nav-header">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="nav-header">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item" v-for="(link, index) in linkList" :key="index" v-on:click="updateSideMenu($route.path)">
                    <router-link :to="link.path" class="nav-link">
                        {{link.title}}
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</nav>
</template>
<script>
    import store from './stores/index.js'
    import { mapActions } from 'vuex'
    export default {
        store,
        data(){
            return this.$store.state.headerNavData
        },
        mounted() {
			console.log('Component "header-nav" mounted.')
            this.currentPath = this.$route.path
            this.initPage()
		},
        methods: {
            ...mapActions('headerNavData',[
                'initPage',
                'updateSideMenu'
            ])   
        }
	}
</script>