<template>
<nav class="container-fluid py-3 fixed-top">
    <div class="row">
        <div class="col-11">
            <div class="row">
                <img src="../../assets/images/girl.svg" class="col-1" alt="avator">
                <div class="col-3">
                    <div class="row h-100">
                        <div class="col-12 align-self-start">
                            <div class="row">
                                <div class="col-8 d-flex align-items-center">{{loginData.name}}<span class="badge badge-warning ml-1">VIP</span></div>
                                <div class="col-4 text-right">Lv. {{loginData.level}}</div>
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
                <div class="col-4">
                    <div class="col-12 align-self-end">
                        <div class="row">
                            <div class="col-12">
                                <span class="font-weight-light">原料倉庫</span>
                                <div class="row">
                                    <div class="col-3">容量</div>
                                    <div class="col-9">
                                        <div class="progress my-2" style="height: 5px">
                                            <div class="progress-bar bg-warning" role="progressbar" style="width: 28%"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 mt-1">
                                    <div class="row">
                                        <div class="col-3 px-1">
                                            <div class="d-flex align-items-center justify-content-center bg-dark text-light rounded-pill py-1">
                                                <i class="fas fa-cannabis"></i><span class="badge badge-pill badge-light ml-1">22</span>
                                            </div>
                                        </div>
                                        <div class="col-3 px-1">
                                            <div class="d-flex align-items-center justify-content-center bg-dark text-light rounded-pill py-1">
                                                <i class="fas fa-feather-alt"></i><span class="badge badge-pill badge-light ml-1">22</span>
                                            </div>
                                        </div>
                                        <div class="col-3 px-1">
                                            <div class="d-flex align-items-center justify-content-center bg-dark text-light rounded-pill py-1">
                                                <i class="fas fa-bug"></i><span class="badge badge-pill badge-light ml-1">22</span>
                                            </div>
                                        </div>
                                        <div class="col-3 px-1">
                                            <div class="d-flex align-items-center justify-content-center bg-dark text-light rounded-pill py-1">
                                                <i class="fas fa-gem"></i><span class="badge badge-pill badge-light ml-1">22</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="col-12 align-self-end">
                        <div class="row">
                            <div class="col-12">
                                <span class="font-weight-light">exp.</span>
                                <div class="progress" style="height: 5px">
                                    <div class="progress-bar bg-warning" role="progressbar" style="width: 28%"></div>
                                </div>
                                <div class="col-12 mt-1">
                                    <div class="row">
                                        <div class="col-3">
                                            <div class="d-flex align-items-center bg-dark text-light">
                                                絲<span class="badge badge-pill badge-light ml-1">22</span>
                                            </div>
                                        </div>
                                        <div class="col-3 d-flex align-items-center bg-dark text-light">
                                            皮<span class="badge badge-pill badge-light ml-1">22</span>
                                        </div>
                                        <div class="col-3 d-flex align-items-center bg-dark text-light">
                                            皮<span class="badge badge-pill badge-light ml-1">22</span>
                                        </div>
                                        <div class="col-3 d-flex align-items-center bg-dark text-light">
                                            皮<span class="badge badge-pill badge-light ml-1">22</span>
                                        </div>
                                    </div>
                                </div>
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