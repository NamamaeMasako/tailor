<template>
<nav class="container-fluid fixed-bottom bg-success" v-if="loginData.access_token != null">
    <div class="row">
        <ul class="col-12 nav justify-content-center">
            <li class="nav-item">
                <router-link to="/home" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/quest" class="nav-link">Quest</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/character" class="nav-link">character</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/shop" class="nav-link">Shop</router-link>
            </li>
        </ul>
    </div>
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