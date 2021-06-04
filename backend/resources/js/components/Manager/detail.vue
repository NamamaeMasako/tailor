<template>
    <div class="container">
        <nav class="my-3" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item" aria-current="page">後臺設定</li>
                <li class="breadcrumb-item" aria-current="page">管理員</li>
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
                        <b-button variant="info" class="text-light" href="/system/manager/list"><i class="fa fa-arrow-left mr-1"></i>返回列表</b-button>
                        <b-form-checkbox v-model="editMode" name="check-button" class="col-form-label" switch>
                            <b v-if="editMode != true">編輯模式：關</b>
                            <b class="text-primary" v-else>編輯模式：開</b>
                        </b-form-checkbox>
                    </div>
                    <div class="card-body">
                        <div class="form-group row">
                            <label for="email" class="col-sm-2 col-form-label">電子郵件</label>
                            <div class="col-10">
                                <input type="email" :class="{'is-invalid': validateMsg.email != '','form-control': editMode == true, 'form-control-plaintext': editMode != true}" :disabled="editMode != true" id="email" v-model="dataList.formList.email">
                                <div class="invalid-feedback">
                                    <span v-for="(msg,index) in validateMsg.email" :key="index">{{msg}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="name" class="col-2 col-form-label">名稱</label>
                            <div class="col-10">
                                <input type="text" :class="{'is-invalid': validateMsg.name != '','form-control': editMode == true, 'form-control-plaintext': editMode != true}" :disabled="editMode != true" id="name" v-model="dataList.formList.name">
                                <div class="invalid-feedback">
                                    <span v-for="(msg,index) in validateMsg.name" :key="index">{{msg}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row" v-if="editMode == true">
                            <label for="name" class="col-2 col-form-label">
                                登入密碼修改
                            </label>
                            <div class="col-10">
                                <div class="form-group row">
                                    <div class="col-2">
                                        <b-button variant="info" class="btn-block" v-on:click="showEditPassword">修改密碼</b-button>
                                    </div>
                                    <div class="col-2">
                                        <b-button variant="warning" class="btn-block" v-on:click="resetPassword">重置密碼</b-button>
                                    </div>
                                </div>
                                <div class="form-group my-0" v-if="editPassword">
                                    {{dataList.editPassword}}
                                    <label for="origin_password" class="col-form-label">修改前密碼</label>
                                    <input type="text" class="form-control" :class="{'is-invalid': validateMsg.origin_password != ''}" id="origin_password" v-model="dataList.formList.origin_password">
                                    <div class="invalid-feedback">
                                        <span v-for="(msg,index) in validateMsg.origin_password" :key="index">{{msg}}</span>
                                    </div>
                                </div>
                                <div class="form-group my-0" v-if="editPassword">
                                    <label for="new_password" class="col-form-label">新密碼</label>
                                    <input type="text" class="form-control" :class="{'is-invalid': validateMsg.new_password != ''}" id="new_password" v-model="dataList.formList.new_password">
                                    <div class="invalid-feedback">
                                        <span v-for="(msg,index) in validateMsg.new_password" :key="index">{{msg}}</span>
                                    </div>
                                </div>
                                <div class="form-group my-0" v-if="editPassword">
                                    <label for="new_password" class="col-form-label">確認新密碼</label>
                                    <input type="text" class="form-control" :class="{'is-invalid': validateMsg.new_password_chk != ''}" id="new_password_chk" v-model="dataList.formList.new_password_chk">
                                    <div class="invalid-feedback">
                                        <span v-for="(msg,index) in validateMsg.new_password_chk" :key="index">{{msg}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="form-group row">
                            <label class="col-2 col-form-label">驗證狀態</label>
                            <div class="col-sm-10">
                                <input type="text" class='form-control-plaintext' disabled v-model="dataList.verified_text">
                            </div>
                        </div> -->
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
            console.log('Component "manager detail" mounted.')
            console.log(this)
            this.dataList.manager_id = this.$route.params.id
            this.initPage()
        },
        computed: {

        },
        watch: { 
            'dataList.formList.email_verified_at': (newVal) =>{
                if(newVal == null){
                   store.state.detailData.dataList.verified_text = '未驗證' 
                }else{
                   store.state.detailData.dataList.verified_text = '已驗證' 
                }
            }
        },
        methods: {
            ...mapMutations('detailData',[
                'countDownChanged',
                'showEditPassword'
            ]),
            ...mapActions('detailData',[
                'initPage',
                'resetPassword',
                'submit'
            ])   
        }
    }
</script>
