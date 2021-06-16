<template>
<nav class="container-fluid py-3 fixed-top">
    <div class="row">
        <div class="col-5">
            <div class="row">
                <img src="../../assets/images/girl.svg" class="col-2" alt="avator">
                <div class="col-9">
                    <div class="row h-100">
                        <div class="col-12 align-self-start">
                            <div class="row">
                                <div class="col-6 d-flex align-items-center">{{loginData.name}}<span class="badge badge-warning ml-1">VIP</span></div>
                                <div class="col-6">Lv. {{loginData.level}}</div>
                            </div>
                        </div>
                        <div class="col-12 align-self-end">
                            <div class="row">
                                <div class="col-6">
                                    <span class="font-weight-light">exp.</span>
                                    <div class="progress" style="height: 5px">
                                        <div class="progress-bar bg-warning" role="progressbar" style="width: 28%"></div>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <span class="font-weight-light">sta.</span>
                                    <div class="progress" style="height: 5px">
                                        <div class="progress-bar bg-success" role="progressbar" style="width: 68%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-1">
                    <b-button variant="danger" v-on:click="logout">登出</b-button>
                </div>
            </div>
        </div>
    </div>
</nav>
</template>
<script>
import store from './_stores/app.js'
import { mapMutations, mapActions } from 'vuex'
export default {
    store,
    data() {
        return this.$store.state.headerNavData
    },
    mounted() {
        console.log('Component "header nav" mounted.')
        console.log(this)
        this.initPage()
    },
    methods: {
        ...mapMutations('headerNavData',[
            'countDownChanged'
        ]),
        ...mapActions('headerNavData',[
            'initPage',
            'logout'
        ])   
    }
}
</script>