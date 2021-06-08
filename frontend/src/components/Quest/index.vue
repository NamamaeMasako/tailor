<template>
<div id="main-content" class="container-fluid">
    <header-nav />
    quest
</div>
</template>
<script>
import store from './_stores/app.js'
import HeaderNav from '../_base/headerNav.vue'
import { mapActions } from 'vuex'

export default {
    store,
    mounted() {
        console.log('Component "'+this.$route.name+'" mounted.')
        this.initPage()
    },
    components: {
        'header-nav': HeaderNav
    },
    methods: {
        ...mapActions('indexData',[
            'initPage'
        ])   
    }
}
</script>