<template>
<div class="row">
    <div id="login" class="jumbotron col-12 m-0">
        <h1 class="display-4 text-center">Tailor</h1>
        <p class="lead text-center">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        <hr class="my-4">
        <p class="text-center">It uses utility classes for typography and spacing to space content out within the larger container.</p>
        <div class="row justify-content-center">
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <div class="form-group">
                            <label for="email">電子郵件</label>
                            <input type="text" id="email" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="password">密碼</label>
                            <input type="text" id="password" class="form-control">
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="row">
                            <div class="col-6">
                                <b-button variant="success" class="btn-block" v-on:click="submit">登入</b-button>
                            </div>
                            <div class="col-6">
                                <b-button variant="primary" href="/register" class="btn-block">註冊</b-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>  
</template>
<script>
import store from './stores/index.js' 
import { mapMutations, mapActions } from 'vuex'
export default {
    store,
    data() {
        return this.$store.state.loginData
    },
    mounted() {
        console.log('Component "login" mounted.')
        console.log(this)
        this.initPage()
    },
    methods: {
        ...mapMutations('loginData',[
            'countDownChanged'
        ]),
        ...mapActions('loginData',[
            'initPage',
            'submit'
        ])   
    }
}
</script>