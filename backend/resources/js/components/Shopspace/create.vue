<template>
    <div class="container">
        <nav class="my-3" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item" aria-current="page">遊戲管理</li>
                <li class="breadcrumb-item" aria-current="page">家具</li>
                <li class="breadcrumb-item active" aria-current="page">新增</li>
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
                        <b-button variant="info" class="text-light" href="/game/furnishing/list"><i class="fa fa-arrow-left mr-1"></i>返回列表</b-button>
                    </div>
                    <div class="card-body">
                        <div class="form-group row">
                            <label for="title" class="col-sm-2 col-form-label">名稱</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" :class="{'is-invalid': validateMsg.title != ''}" id="title" v-model="dataList.formList.title">
                                <div class="invalid-feedback">
                                    <span v-for="(msg,index) in validateMsg.title" :key="index">{{msg}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label">適用類型</label>
                            <div class="col-10">
                                <b-form-checkbox button button-variant="outline-primary" v-for="(option, index) in dataList.selectList.type" :key="index" v-model="dataList.formList.type" name="type" class="mr-2 mt-2" :value="index">{{option}}</b-form-checkbox>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="space" class="col-sm-2 col-form-label">空間數量</label>
                            <div class="col-sm-10">
                                <input type="number" min="0" class="form-control" :class="{'is-invalid': validateMsg.space != ''}" id="space" v-model="dataList.formList.space">
                                <div class="invalid-feedback">
                                    <span v-for="(msg,index) in validateMsg.space" :key="index">{{msg}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-center">
                        <b-button variant="success" v-on:click="submit">送出</b-button>
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
            return this.$store.state.createData
        },
         mounted() {
            console.log('Component "'+this.$route.name+'" mounted.')
            this.$emit('updateCurrentPath', this.$route.path)
            console.log(this)
            this.initPage()
        },
        computed: {

        },
        methods: {
            ...mapMutations('createData',[
                'countDownChanged'
            ]),
            ...mapActions('createData',[
                'initPage',
                'submit',
            ])
        }
    }
</script>
