<template>
    <div class="container">
        <nav class="my-3" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item" aria-current="page">遊戲管理</li>
                <li class="breadcrumb-item" aria-current="page">任務</li>
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
                        <b-button variant="info" class="text-light" href="/game/stage/list"><i class="fa fa-arrow-left mr-1"></i>返回列表</b-button>
                    </div>
                    <div class="card-body">
                        <div class="form-group row">
                            <label for="title" class="col-2 col-form-label">名稱</label>
                            <div class="col-10">
                                <input type="text" class="form-control" :class="{'is-invalid': validateMsg.title != ''}" id="title" v-model="dataList.formList.title">
                                <div class="invalid-feedback">
                                    <span v-for="(msg,index) in validateMsg.title" :key="index">{{msg}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="title" class="col-2 col-form-label">順序</label>
                            <div class="col-10">
                                <input type="number" class="form-control" min=0 :class="{'is-invalid': validateMsg.order != ''}" id="title" v-model="dataList.formList.order">
                                <div class="invalid-feedback">
                                    <span v-for="(msg,index) in validateMsg.order" :key="index">{{msg}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="time" class="col-2 col-form-label">執行時間</label>
                            <div class="col-10">
                                <div class="input-group" :class="{'is-invalid': validateMsg.time != ''}">
                                    <input type="number" class="form-control" v-model="dataList.showHour" placeholder="時">
                                    <div class="input-group-append">
                                        <span class="input-group-text" id="inputGroupPrepend2">：</span>
                                    </div>
                                    <input type="number" class="form-control" v-model="dataList.showMinute" placeholder="分">
                                    <div class="input-group-append">
                                        <span class="input-group-text" id="inputGroupPrepend2">：</span>
                                    </div>
                                    <input type="number" class="form-control" v-model="dataList.showSecond" placeholder="秒">
                                </div>
                                <div class="invalid-feedback">
                                    <span v-for="(msg,index) in validateMsg.time" :key="index">{{msg}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-header">可獲得獎勵</div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-2">
                                                <div class="input-group">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text"><i class="fas fa-bug"></i></span>
                                                    </div>
                                                    <b-select class="form-control" :options="dataList.selectList.resource" v-model="dataList.formList.bug_value"></b-select>
                                                </div>
                                            </div>
                                            <div class="col-2">
                                                <div class="input-group">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text"><i class="fas fa-feather"></i></span>
                                                    </div>
                                                    <b-select class="form-control" :options="dataList.selectList.resource" v-model="dataList.formList.feather_value"></b-select>
                                                </div>
                                            </div>
                                            <div class="col-2">
                                                <div class="input-group">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text"><i class="fas fa-cannabis"></i></span>
                                                    </div>
                                                    <b-select class="form-control" :options="dataList.selectList.resource" v-model="dataList.formList.cannabis_value"></b-select>
                                                </div>
                                            </div>
                                            <div class="col-2">
                                                <div class="input-group">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text"><i class="fas fa-gem"></i></span>
                                                    </div>
                                                    <b-select class="form-control" :options="dataList.selectList.resource" v-model="dataList.formList.gem_value"></b-select>
                                                </div>
                                            </div>
                                            <div class="col-2">
                                                <div class="input-group">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text"><i class="fas fa-coins"></i></span>
                                                    </div>
                                                    <input type="number" class="form-control" v-model="dataList.formList.coins">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
