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
        <div class="collapse navbar-collapse" id="nav-header" v-if="loginData != null">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item" v-for="(link, index) in linkList" :key="index" v-on:click="updateSideMenu($route.path)">
                    <router-link :to="link.path" class="nav-link">
                        {{link.title}}
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="h-100" v-if="loginData != null">
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">歡迎，</span>
                </div>
                <input type="text" class="form-control-plaintext bg-light text-center" disabled placeholder="Username" v-model="loginData.name">
                <div class="input-group-append">
                    <b-button variant="outline-light" v-on:click="logout">登出</b-button>
                </div>
            </div>
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
                'updateSideMenu',
                'logout'
            ])   
        }
	}
</script>