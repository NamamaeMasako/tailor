<template>
    <div class="container">
        <nav class="my-3" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item" aria-current="page">遊戲管理</li>
                <li class="breadcrumb-item" aria-current="page">家具</li>
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
                        <b-button variant="info" class="text-light" href="/game/furnishing/list"><i class="fa fa-arrow-left mr-1"></i>返回列表</b-button>
                        <b-form-checkbox v-model="editMode" name="check-button" class="col-form-label" switch>
                            <b v-if="editMode != true">編輯模式：關</b>
                            <b class="text-primary" v-else>編輯模式：開</b>
                        </b-form-checkbox>
                    </div>
                    <div class="card-body">
                        <div class="form-group row">
                            <label for="title" class="col-sm-2 col-form-label">名稱</label>
                            <div class="col-10">
                                <input type="text" :class="{'is-invalid': validateMsg.title != '','form-control': editMode == true, 'form-control-plaintext': editMode != true}" :disabled="editMode != true" id="title" v-model="dataList.formList.title">
                                <div class="invalid-feedback">
                                    <span v-for="(msg,index) in validateMsg.title" :key="index">{{msg}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label">適用類型</label>
                            <div class="col-10" v-if="editMode != true">
                                <span class="badge badge-secondary mr-1" v-for="(type_text, index) in dataList.formList.type_text" :key="index">{{type_text}}</span>
                            </div>
                            <div class="col-10" v-else>
                                <b-form-checkbox button button-variant="outline-primary" v-for="(option, index) in dataList.selectList.type" :key="index" v-model="dataList.formList.type" name="type" class="mr-2 mt-2" :value="index">{{option}}</b-form-checkbox>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="space" class="col-sm-2 col-form-label">空間數量</label>
                            <div class="col-10">
                                <input type="text" :class="{'is-invalid': validateMsg.space != '','form-control': editMode == true, 'form-control-plaintext': editMode != true}" :disabled="editMode != true" id="space" v-model="dataList.formList.space">
                                <div class="invalid-feedback">
                                    <span v-for="(msg,index) in validateMsg.space" :key="index">{{msg}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="enable" class="col-sm-2 col-form-label">開放狀態</label>
                            <div class="col-10" v-if="editMode != true">
                                <input type="text" class="form-control-plaintext" disabled id="enable" v-model="dataList.formList.enable_text">
                            </div>
                            <div class="col-10" v-else>
                                <div class="d-flex py-1" :class="{'is-invalid': validateMsg.enable != ''}">
                                    <b-form-radio v-model="dataList.formList.enable" name="enable" class="mr-4" value="0">未開放</b-form-radio>
                                    <b-form-radio v-model="dataList.formList.enable" name="enable" class="mr-4" value="1">開放</b-form-radio>
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
            console.log('Component "'+this.$route.name+'" mounted.')
            this.$emit('updateCurrentPath', this.$route.path)
            console.log(this)
            this.dataList.furnishingNo = this.$route.params.furnishing_no
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
