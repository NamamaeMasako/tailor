<template>
    <div class="container">
        <nav class="my-3" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item" aria-current="page">資料管理</li>
                <li class="breadcrumb-item active" aria-current="page">參數</li>
            </ol>
        </nav>
        <b-alert :variant="alert.variant" dismissible :show="alert.dismissCountDown" v-on:dismissed="alert.dismissCountDown=0" v-on:dismiss-count-down="countDownChanged">
            <p>{{alert.message}}</p>
            <b-progress :variant="alert.variant" :max="alert.dismissSecs-1" :value="alert.dismissCountDown-1" height="4px"></b-progress>
        </b-alert>
        <div class="row justify-content-center">
            <div class="col-12">
                <b-card no-body>
                    <b-tabs pills card vertical nav-wrapper-class="col-3">
                        <b-tab :title="dataList.tabTitleList[index]" v-for="(constantList, index) in dataList.items" :key="index" :active="index == 'stage'">
                            <b-card-text>Tab contents 1</b-card-text>
                        </b-tab>
                    </b-tabs>
                </b-card>
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
            console.log('Component "'+this.$route.name+'" mounted.')
            this.$emit('updateCurrentPath', this.$route.path)
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
