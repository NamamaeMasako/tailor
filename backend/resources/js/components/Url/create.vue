<template>
    <div class="container">
        <nav class="my-3" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item" aria-current="page">系統</li>
                <li class="breadcrumb-item" aria-current="page">頁面連結</li>
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
                        <b-button variant="info" class="text-light" href="/system/url/list"><i class="fa fa-arrow-left mr-1"></i>返回列表</b-button>
                    </div>
                    <div class="card-body">
                        <div class="form-group row">
                            <label for="title" class="col-sm-2 col-form-label">連結名稱</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" :class="{'is-invalid': validateMsg.title != ''}" id="title" v-model="dataList.formList.title">
                                <div class="invalid-feedback">
                                    <span v-for="(msg,index) in validateMsg.title" :key="index">{{msg}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="mother_path" class="col-sm-2 col-form-label">所屬路徑</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" :class="{'is-invalid': validateMsg.mother_path != ''}" id="mother_path" v-model="dataList.formList.mother_path">
                                <div class="invalid-feedback">
                                    <span v-for="(msg,index) in validateMsg.mother_path" :key="index">{{msg}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="path" class="col-sm-2 col-form-label">路徑</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" :class="{'is-invalid': validateMsg.path != ''}" id="path" v-model="dataList.formList.path">
                                <div class="invalid-feedback">
                                    <span v-for="(msg,index) in validateMsg.path" :key="index">{{msg}}</span>
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
