<template>
    <div class="container">
        <nav class="my-3" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item" aria-current="page">遊戲管理</li>
                <li class="breadcrumb-item" aria-current="page">任務</li>
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
                        <b-button variant="info" class="text-light" href="/game/stage/list"><i class="fa fa-arrow-left mr-1"></i>返回列表</b-button>
                        <b-form-checkbox v-model="editMode" name="check-button" class="col-form-label" switch>
                            <b v-if="editMode != true">編輯模式：關</b>
                            <b class="text-primary" v-else>編輯模式：開</b>
                        </b-form-checkbox>
                    </div>
                    <div class="card-body">
                        <div class="form-group row">
                            <label for="title" class="col-sm-2 col-form-label">名稱</label>
                            <div class="col-sm-10">
                                <input type="text" :class="{'is-invalid': validateMsg.title != '','form-control': editMode == true, 'form-control-plaintext': editMode != true}" :disabled="editMode != true" id="title" v-model="dataList.formList.title">
                                <div class="invalid-feedback">
                                    <span v-for="(msg,index) in validateMsg.title" :key="index">{{msg}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="title" class="col-sm-2 col-form-label">所屬區域</label>
                            <div class="col-sm-10" v-if="editMode != true">
                                <input type="text" class="form-control-plaintext" v-model="dataList.formList.area_title">
                            </div>
                            <div class="col-sm-10" v-else>
                                <b-form-select v-model="dataList.formList.area_no" :options="dataList.selectList.area"></b-form-select>
                                <div class="invalid-feedback">
                                    <span v-for="(msg,index) in validateMsg.area_no" :key="index">{{msg}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="title" class="col-sm-2 col-form-label">順序</label>
                            <div class="col-sm-10">
                                <input type="number" :class="{'is-invalid': validateMsg.order != '','form-control': editMode == true, 'form-control-plaintext': editMode != true}" :disabled="editMode != true" id="order" min="1" v-model="dataList.showOrder">
                                <div class="invalid-feedback">
                                    <span v-for="(msg,index) in validateMsg.order" :key="index">{{msg}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="time" class="col-sm-2 col-form-label">執行時間</label>
                            <div class="col-sm-10" v-if="editMode != true">
                                <input type="text" class="form-control-plaintext" disabled id="time" v-model="dataList.formList.time">
                            </div>
                            <div class="col-sm-10" v-else>
                                <div class="input-group" :class="{'is-invalid': validateMsg.time != ''}">
                                    <input type="text" class="form-control" v-model="dataList.showHour" placeholder="時">
                                    <div class="input-group-append">
                                        <span class="input-group-text" id="inputGroupPrepend2">：</span>
                                    </div>
                                    <input type="text" class="form-control" v-model="dataList.showMinute" placeholder="分">
                                    <div class="input-group-append">
                                        <span class="input-group-text" id="inputGroupPrepend2">：</span>
                                    </div>
                                    <input type="text" class="form-control" v-model="dataList.showSecond" placeholder="秒">
                                </div>
                                <div class="invalid-feedback">
                                    <span v-for="(msg,index) in validateMsg.time" :key="index">{{msg}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label">開放狀態</label>
                            <div class="col-sm-10" v-if="editMode != true">
                                <input type="text" class='form-control-plaintext' disabled v-model="dataList.formList.enable_text">
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
            this.dataList.stageNo = this.$route.params.stage_no
            this.initPage()
        },
        computed: {

        },
        watch: {
            'dataList.showOrder': (newVal) => {
                store.state.detailData.dataList.formList.order = newVal - 1
            },
            'dataList.showHour': (newVal) => {
                let v = newVal;
                if(parseInt(newVal) == NaN){
                    v = '00'
                }else if(parseInt(newVal) < 10){
                    v = '0' + v
                }
                store.state.detailData.dataList.formList.time = v+':'+store.state.detailData.dataList.showMinute+':'+store.state.detailData.dataList.showSecond
            },
            'dataList.showMinute': (newVal) => {
                let v = newVal;
                if(parseInt(newVal) == NaN){
                    v = '00'
                }else if(parseInt(newVal) < 10){
                    v = '0' + v
                }
                store.state.detailData.dataList.formList.time = store.state.detailData.dataList.showHour+':'+v+':'+store.state.detailData.dataList.showSecond
            },
            'dataList.showSecond': (newVal) => {
                let v = newVal;
                if(parseInt(newVal) == NaN){
                    v = '00'
                }else if(parseInt(newVal) < 10){
                    v = '0' + v
                }
                store.state.detailData.dataList.formList.time = store.state.detailData.dataList.showHour+':'+store.state.detailData.dataList.showMinute+':'+v
            }
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
