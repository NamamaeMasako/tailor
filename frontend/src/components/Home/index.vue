<template>
<div id="main-content" class="container-fluid">
    <header-nav />
    <b-card no-body>
        <b-tabs card>
            <b-tab title="店內規劃" active>
                <b-card-text>
                    <div class="row">
                        <div class="col-3 mb-2" v-for="(shopspace, index) in dataList.memberData.member_shopspace" :key="index">
                            <div class="card">
                                <div class="card-header">{{shopspace.title}}</div>
                                <div class="card-body">
                                    <div class="w-100 btn-group" v-if="shopspace.furnishing_no != null">
                                        <b-button variant="info" class="col-10" v-b-toggle="shopspace.shopspace_no">{{shopspace.furnishing_title}}</b-button>
                                        <b-button variant="outline-info" class="col-2" v-b-toggle="'furnishingList'+index"><i class="fas fa-angle-down"></i></b-button>
                                    </div>
                                    <b-button variant="outline-info" v-b-toggle="'furnishingList'+index" class="btn-block" v-else>空</b-button>
                                    <b-collapse :id="shopspace.shopspace_no">
                                        <b-card>{{shopspace}}</b-card>
                                    </b-collapse>
                                    <b-collapse :id="'furnishingList'+index">
                                        <ul class="list-group">
                                            <li class="list-group-item" v-for="(furnishing, index) in dataList.memberData.member_furnishing" :key="index">{{furnishing.title}}</li>
                                        </ul>
                                    </b-collapse>
                                </div>
                            </div>
                        </div>
                    </div>
                </b-card-text>
            </b-tab>
            <b-tab title="工作室">
                <b-card-text v-if="workStatus == true">
                    <h4>努力工作中...</h4>
                    正在製作{{dataList.memberData.work_count}}次的{{workTitle}}，預計將於 {{workCountDown}} 後完成工作
                </b-card-text>
                <b-card-text v-else>
                    <!-- <div class="card mb-3">
                        <div class="card-header">新商品發想</div>
                        <div class="card-body">
                            <label>發想時間</label>
                            <div class="row">
                                <div class="col-3">
                                    <b-button variant="success" class="btn-block">1小時</b-button>
                                </div>
                                <div class="col-3">
                                    <b-button variant="success" class="btn-block">3小時</b-button>
                                </div>
                                <div class="col-3">
                                    <b-button variant="success" class="btn-block">5小時</b-button>
                                </div>
                                <div class="col-3">
                                    <b-button variant="success" class="btn-block">7小時</b-button>
                                </div>
                            </div>
                        </div>
                    </div> -->
                    <div class="card">
                        <div class="card-header">可製作商品列表</div>
                        <div class="card-body">
                            <b-table :items="dataList.selectList.costumeList" :fields="dataList.fields" :per-page="dataList.perPage" :current-page="dataList.currentPage" show-empty empty-text="抱歉，這裡沒有資料!">
                                <template #cell(costume_no)="data">
                                    <b-button variant="success" v-on:click="getCostumeData(data.item)">製作</b-button>
                                    <b-modal :title="'製作'+data.item.title" v-model="modalStatus.getCostume">
                                        <div class="row">
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <label>製作次數 {{dataList.formList.count}}</label>
                                                    <input type="range" min="1" class="form-control-range my-2" v-model="dataList.formList.count" v-on:change="updateCost">
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <label>預計獲得產品數量</label>
                                                    <input type="number" min="1" class="form-control" v-model="dataList.modalData.amount" disabled>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label>消耗資源</label>
                                            <div class="row">
                                                <div class="form-group col-3">
                                                    <div class="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text"><i class="fas fa-bug"></i></span>
                                                        </div>
                                                        <input type="text" class="form-control text-center" :class="{'text-danger': dataList.modalData.bug > dataList.memberData.bug}" v-model="dataList.modalData.bug" disabled>
                                                    </div>
                                                </div>
                                                <div class="form-group col-3">
                                                    <div class="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text"><i class="fas fa-feather"></i></span>
                                                        </div>
                                                        <input type="text" class="form-control text-center" :class="{'text-danger': dataList.modalData.feather > dataList.memberData.feather}" v-model="dataList.modalData.feather" disabled>
                                                    </div>
                                                </div>
                                                <div class="form-group col-3">
                                                    <div class="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text"><i class="fas fa-cannabis"></i></span>
                                                        </div>
                                                        <input type="text" class="form-control text-center" :class="{'text-danger': dataList.modalData.cannabis > dataList.memberData.cannabis}" v-model="dataList.modalData.cannabis" disabled>
                                                    </div>
                                                </div>
                                                <div class="form-group col-3">
                                                    <div class="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text"><i class="fas fa-gem"></i></span>
                                                        </div>
                                                        <input type="text" class="form-control text-center" :class="{'text-danger': dataList.modalData.gem > dataList.memberData.gem}" v-model="dataList.modalData.gem" disabled>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="form-group col-6">
                                                <label>花費體力</label>
                                                <input type="text" class="form-control" :class="{'is-invalid': dataList.modalData.stamina > dataList.memberData.stamina}" v-model="dataList.modalData.stamina" disabled>
                                                <div class="invalid-feedback">
                                                    <span>體力不足!</span>
                                                </div>
                                            </div>
                                            <div class="form-group col-6">
                                                <label>花費時間</label>
                                                <input type="text" class="form-control" v-model="dataList.modalData.time" disabled>
                                            </div>
                                        </div>
                                        
                                        <template v-slot:modal-footer>
                                            <div class="col-6">
                                                <b-button class="btn-block" v-on:click="modalStatus.getCostume = false">取消</b-button>
                                            </div>
                                            <div class="col-6">
                                                <b-button variant="success" class="btn-block" :disabled="!amountCheck" v-on:click="submit">開始</b-button>
                                            </div>
                                        </template>
                                    </b-modal>
                                </template>
                            </b-table>
                        </div>
                    </div>
                </b-card-text>
            </b-tab>
        </b-tabs>
    </b-card>
</div>
</template>
<script>
import store from './_stores/app.js'
import HeaderNav from '../_base/headerNav.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    store,
    data() {
        return this.$store.state.indexData
    },
    mounted() {
        console.log('Component "'+this.$route.name+'" mounted.')
        this.$emit('updateCurrentPath', this.$route.path)
        console.log(this)
        this.initPage()
    },
    components: {
        'header-nav': HeaderNav
    },
    watch: {
        '$store.state.indexData.workStatus': (val) => {
            if(val == true){
                store.dispatch('indexData/checkWorkStatus')
            }
        }
    },
    computed: {
        ...mapGetters('indexData',[
            'amountCheck'
        ])
    },
    methods: {
        ...mapMutations('indexData',[
            'updateCost',
            'getCostumeData'
        ]),
        ...mapActions('indexData',[
            'checkWorkStatus',
            'initPage',
            'submit'
        ])
    },
}
</script>