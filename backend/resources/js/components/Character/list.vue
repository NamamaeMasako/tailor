<template>
    <div class="container">
        <nav class="my-3" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item" aria-current="page">角色</li>
                <li class="breadcrumb-item active" aria-current="page">列表</li>
            </ol>
        </nav>
        <b-alert :variant="alert.variant" dismissible :show="alert.dismissCountDown" v-on:dismissed="alert.dismissCountDown=0" v-on:dismiss-count-down="countDownChanged">
            <p>{{alert.message}}</p>
            <b-progress :variant="alert.variant" :max="alert.dismissSecs-1" :value="alert.dismissCountDown-1" height="4px"></b-progress>
        </b-alert>
        <div class="row justify-content-center">
            <div class="col-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between">
                        <span class="mt-2">共{{itemsCount}}筆</span>
                        <b-button variant="primary" href="/character/create">新增</b-button>
                    </div>
                    <div class="card-body">
                        <b-table :items="dataList.items" :fields="dataList.fields" :per-page="dataList.perPage" :current-page="dataList.currentPage" show-empty empty-text="抱歉，這裡沒有資料!">
                            <template #cell(detailLink)="data">
                                <b-button variant="info" class="text-light" :href="data.item.detailLink"><i class="fas fa-file-alt"></i></b-button>
                            </template>
                        </b-table>
                    </div>
                    <div class="card-footer d-flex justify-content-center">
                        <b-pagination v-model="dataList.currentPage" :total-rows="itemsCount" :per-page="dataList.perPage" class="my-0"></b-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import store from './stores/index.js' 
    import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
    export default {
        store,
        data() {
            return this.$store.state.listData
        },
         mounted() {
            console.log('Component "character list" mounted.')
            console.log(this)
            this.initPage()
        },
        computed: {
            ...mapGetters('listData',[
                'itemsCount'
            ])
        },
        methods: {
            ...mapMutations('listData',[
                'countDownChanged'
            ]),
            ...mapActions('listData',[
                'initPage'
            ])   
        }
    }
</script>
