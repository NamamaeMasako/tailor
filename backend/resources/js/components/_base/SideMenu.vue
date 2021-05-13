<template>
<aside id="main-aside">
    <div class="list-group list-group-flush w-100">
        <router-link v-for="(link, index) in linkList" :key='index' :to="link.href" class="list-group-item list-group-item-action">
            {{link.text}}
        </router-link>
    </div>
</aside>
</template>
<script>
    import store from './stores/index.js'
    import { mapActions } from 'vuex'
    export default {
        store,
        data(){
            return this.$store.state.sideMenuData
        },
        mounted() {
			console.log('Component "side-menu" mounted.')
            this.componentName = this.$route.name
            this.initPage()
		},
        computed: {
            
        },
        methods: {
            ...mapActions('sideMenuData',[
                'initPage'
            ])   
        }
	}
</script>