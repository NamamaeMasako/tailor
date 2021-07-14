<template>
<nav id="footer" class="container-fluid fixed-bottom" v-if="loginData.access_token != null">
    <div class="row">
        <ul class="col-12 nav nav-tabs justify-content-center">
            <li class="nav-item">
                <router-link to="/home" class="nav-link" :class="{'action':currentPath.indexOf('home')>-1}">Home</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/quest" class="nav-link" :class="{'action':currentPath.indexOf('quest')>-1}">Quest</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/character" class="nav-link" :class="{'action':currentPath.indexOf('character')>-1}">Character</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/shop" class="nav-link" :class="{'action':currentPath.indexOf('shop')>-1}">Shop</router-link>
            </li>
        </ul>
    </div>
    <div id="bottom-bar" class="row">{{currentPath}}<br>{{$route.path}}</div>
</nav>
</template>
<script>
import store from './_stores/app.js'
import { mapMutations, mapActions } from 'vuex'
export default {
    store,
    data() {
        return this.$store.state.footerNavData
    },
    mounted() {
        console.log('Component "footer nav" mounted.')
        console.log(this)
        this.currentPath = this.$route.path
        this.initPage()
    },
    methods: {
        ...mapMutations('footerNavData',[
            'countDownChanged'
        ]),
        ...mapActions('footerNavData',[
            'initPage',
            'submit'
        ])   
    }
}
</script>