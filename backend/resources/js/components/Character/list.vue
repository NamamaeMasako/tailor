<template>
    <div class="container">
        <nav class="my-3" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item" aria-current="page">角色</li>
                <li class="breadcrumb-item active" aria-current="page">列表</li>
            </ol>
        </nav>
        <div class="row justify-content-center">
            <div class="col-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between">
                        <span class="mt-2">共{{itemsCount}}筆</span>
                        <b-button variant="primary" href="/character/create">新增</b-button>
                    </div>
                    <div class="card-body">
                        <b-table :items="dataList.items" :fields="dataList.fields" :per-page="dataList.perPage" :current-page="dataList.currentPage" show-empty empty-text="抱歉，這裡沒有資料!"></b-table>
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
            ...mapActions('listData',[
                'initPage'
            ])   
        }
    }
</script>
