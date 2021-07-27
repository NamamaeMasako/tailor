<template>
<nav class="container-fluid py-3 fixed-top">
    <div class="row">
        <div class="col-11">
            <div class="row">
                <img src="../../assets/images/girl.svg" class="col-1" alt="avator">
                <div class="col-5">
                    <div class="row h-100 align-content-between">
                        <div class="col-12">
                            <div class="row">
                                <div class="col-6 d-flex align-items-center">{{dataList.loginData.name}}<span class="badge badge-warning ml-1">VIP</span></div>
                                <div class="col-2">Lv. {{dataList.loginData.level}}</div>
                                <div class="col-4"><i class="fas fa-coins mr-2"></i>{{dataList.loginData.coins}}</div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="row">
                                <div class="col-4">
                                    <div class="row">
                                        <div class="col-6 font-weight-light"><i class="fas fa-book"></i></div>
                                        <div class="col-6 font-weight-light text-right">{{dataList.loginData.experience}}/{{dataList.constantSetting.inUsed.experience}}</div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="progress" style="height: 5px">
                                                <div class="progress-bar bg-warning" role="progressbar" :style="'width:'+ experienceBar +'%'"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="row">
                                        <div class="col-6 font-weight-light"><i class="fas fa-bolt"></i></div>
                                        <div class="col-6 font-weight-light text-right">{{dataList.loginData.stamina}}/{{dataList.constantSetting.inUsed.staminaLimit}}</div>
                                    </div>
                                    <div class="progress" style="height: 5px">
                                        <div class="progress-bar bg-success" role="progressbar" :style="'width:'+ staminaBar +'%'"></div>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="row">
                                        <div class="col-6 font-weight-light"><i class="fas fa-archive"></i></div>
                                        <div class="col-6 font-weight-light text-right">{{dataList.loginData.costume_totalAmount}}/{{dataList.constantSetting.inUsed.warehouse}}</div>
                                    </div>
                                    <div class="progress" style="height: 5px">
                                        <div class="progress-bar bg-info" role="progressbar" :style="'width:'+ warehouseBar +'%'"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="row h-100 align-content-between">
                        <div class="col-12">
                            <div class="row">
                                <div class="col-12">
                                    <div class="row">
                                        <div class="col-6 font-weight-light">原料存量</div>
                                        <div class="col-6 text-right">{{resourceTotalAmount}}/{{dataList.constantSetting.inUsed.resourceLimit}}</div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="progress" style="height: 5px">
                                                <div class="progress-bar bg-warning" role="progressbar" :style="'width:'+ resourceBar +'%'"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 d-flex">
                            <div class="col-3 d-flex align-items-center justify-content-center bg-dark text-light border border-white rounded-pill p-1">
                                <i class="fas fa-bug"></i><span class="badge badge-pill badge-light ml-1">{{dataList.loginData.bug}}</span>
                            </div>
                            <div class="col-3 d-flex align-items-center justify-content-center bg-dark text-light border border-white rounded-pill p-1">
                                <i class="fas fa-feather"></i><span class="badge badge-pill badge-light ml-1">{{dataList.loginData.feather}}</span>
                            </div>
                            <div class="col-3 d-flex align-items-center justify-content-center bg-dark text-light border border-white rounded-pill p-1">
                                <i class="fas fa-cannabis"></i><span class="badge badge-pill badge-light ml-1">{{dataList.loginData.cannabis}}</span>
                            </div>
                            <div class="col-3 d-flex align-items-center justify-content-center bg-dark text-light border border-white rounded-pill p-1">
                                <i class="fas fa-gem"></i><span class="badge badge-pill badge-light ml-1">{{dataList.loginData.gem}}</span>
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
import { mapGetters, mapMutations, mapActions } from 'vuex'
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
    computed: {
        ...mapGetters('headerNavData',[
            'resourceBar',
            'resourceTotalAmount',
            'experienceBar',
            'staminaBar',
            'warehouseBar'
        ])
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