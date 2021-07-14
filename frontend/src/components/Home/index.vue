<template>
<div id="main-content" class="container-fluid">
    <header-nav />
    <b-card no-body>
        <b-tabs card>
            <b-tab title="Tab 1" active>
                <b-card-text>Tab contents 1</b-card-text>
            </b-tab>
            <b-tab title="工作室">
                <b-card-text>
                    <div class="card">
                        <div class="card-header">商品列表</div>
                        <div class="card-body">
                            <b-table :items="dataList.selectList.costumeList" :fields="dataList.fields" :per-page="dataList.perPage" :current-page="dataList.currentPage" show-empty empty-text="抱歉，這裡沒有資料!">
                                <template #cell(costume_no)="data">
                                    <b-button variant="success" v-on:click="getCostumeData(data.item)">製作</b-button>
                                    <b-modal :title="'製作'+data.item.title" v-model="modalStatus.getCostume">

                                        <div class="form-group">
                                            <label>製作數量 {{dataList.formList.amount}}</label>
                                            <input type="range" min="1" class="form-control-range" v-model="dataList.formList.amount">
                                        </div>
                                        <div class="form-group">
                                            <label>消耗資源</label>
                                            <div class="row">
                                                <div class="form-group col-3">
                                                    <div class="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text"><i class="fas fa-bug"></i></span>
                                                        </div>
                                                        <input type="text" class="form-control text-center" v-model="dataList.formList.bug" disabled>
                                                    </div>
                                                </div>
                                                <div class="form-group col-3">
                                                    <div class="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text"><i class="fas fa-feather"></i></span>
                                                        </div>
                                                        <input type="text" class="form-control text-center" v-model="dataList.formList.feather" disabled>
                                                    </div>
                                                </div>
                                                <div class="form-group col-3">
                                                    <div class="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text"><i class="fas fa-cannabis"></i></span>
                                                        </div>
                                                        <input type="text" class="form-control text-center" v-model="dataList.formList.cannabis" disabled>
                                                    </div>
                                                </div>
                                                <div class="form-group col-3">
                                                    <div class="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text"><i class="fas fa-gem"></i></span>
                                                        </div>
                                                        <input type="text" class="form-control text-center" v-model="dataList.formList.gem" disabled>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
import { mapActions } from 'vuex'

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
    methods: {
        ...mapActions('indexData',[
            'initPage',
            'getCostumeData'
        ])
    },
}
</script>