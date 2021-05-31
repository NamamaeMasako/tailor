<template>
    <div class="container">
        <nav class="my-3" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item" aria-current="page">角色</li>
                <li class="breadcrumb-item" aria-current="page">職業</li>
                <li class="breadcrumb-item active" aria-current="page">詳細資料</li>
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
                        <b-button variant="info" class="text-light" href="/character/job/list"><i class="fa fa-arrow-left mr-1"></i>返回列表</b-button>
                        <b-form-checkbox v-model="editMode" name="check-button" class="col-form-label" switch>
                            <b v-if="editMode != true">編輯模式：關</b>
                            <b class="text-primary" v-else>編輯模式：開</b>
                        </b-form-checkbox>
                    </div>
                    <div class="card-body">
                        <div class="form-group row">
                            <label for="title" class="col-sm-2 col-form-label">名稱</label>
                            <div class="col-sm-10">
                                <input type="text" :class="{'is-invalid': validateMsg.title != '','form-control': editMode == true, 'form-control-plaintext': editMode != true}" id="title" v-model="dataList.formList.title">
                                <div class="invalid-feedback">
                                    <span v-for="(msg,index) in validateMsg.title" :key="index">{{msg}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label">選用狀態</label>
                            <div class="col-sm-10" v-if="editMode != true">
                                <input type="text" class='form-control-plaintext' disabled v-model="dataList.formList.enable_text">
                            </div>
                            <div class="col-10" v-else>
                                <div class="d-flex py-1" :class="{'is-invalid': validateMsg.enable != ''}">
                                    <b-form-radio v-model="dataList.formList.enable" name="enable" class="mr-4" value="0">不可選用</b-form-radio>
                                    <b-form-radio v-model="dataList.formList.enable" name="enable" class="mr-4" value="1">可選用</b-form-radio>
                                </div>
                                <div class="invalid-feedback">
                                    <span v-for="(msg,index) in validateMsg.enable" :key="index">{{msg}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-center" v-if="editMode == true">
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
            return this.$store.state.detailData
        },
         mounted() {
            console.log('Component "job detail" mounted.')
            console.log(this)
            this.dataList.jobNo = this.$route.params.job_no
            this.initPage()
        },
        computed: {

        },
        methods: {
            ...mapMutations('detailData',[
                'countDownChanged'
            ]),
            ...mapActions('detailData',[
                'initPage',
                'submit'
            ])   
        }
    }
</script>
