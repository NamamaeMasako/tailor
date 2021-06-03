<template>
    <div class="container">
        <nav class="my-3" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item" aria-current="page">會員</li>
                <li class="breadcrumb-item" aria-current="page">列表</li>
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
                        <b-button variant="info" class="text-light" href="/member/list"><i class="fa fa-arrow-left mr-1"></i>返回列表</b-button>
                    </div>
                    <div class="card-body">
                        <div class="form-group row">
                            <label for="name" class="col-2 col-form-label">名稱</label>
                            <div class="col-10">
                                <input type="text" class="form-control" :class="{'is-invalid': validateMsg.name != ''}" id="name" v-model="dataList.formList.name">
                                <div class="invalid-feedback">
                                    <span v-for="(msg,index) in validateMsg.name" :key="index">{{msg}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="name" class="col-2 col-form-label">電子郵件</label>
                            <div class="col-10">
                                <input type="text" class="form-control" :class="{'is-invalid': validateMsg.email != ''}" id="name" v-model="dataList.formList.email">
                                <div class="invalid-feedback">
                                    <span v-for="(msg,index) in validateMsg.email" :key="index">{{msg}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="name" class="col-2 col-form-label">密碼</label>
                            <div class="col-10">
                                <input type="text" class="form-control" :class="{'is-invalid': validateMsg.password != ''}" id="name" v-model="dataList.formList.password">
                                <div class="invalid-feedback">
                                    <span v-for="(msg,index) in validateMsg.password" :key="index">{{msg}}</span>
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
            console.log('Component "character create" mounted.')
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
                'submit'
            ])   
        }
    }
</script>
