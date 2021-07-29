<template>
    <div class="container">
        <nav class="my-3" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item" aria-current="page">角色</li>
                <li class="breadcrumb-item" aria-current="page">服裝</li>
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
                        <b-button variant="info" class="text-light" href="/game/costume/list"><i class="fa fa-arrow-left mr-1"></i>返回列表</b-button>
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
                            <label class="col-2 col-form-label">適用性別</label>
                            <div class="col-10">
                                <div class="d-flex py-1" :class="{'is-invalid': validateMsg.gender != ''}">
                                    <b-form-radio v-model="dataList.formList.gender" name="gender" class="mr-4" value="0">女</b-form-radio>
                                    <b-form-radio v-model="dataList.formList.gender" name="gender" class="mr-4" value="1">男</b-form-radio>
                                    <b-form-radio v-model="dataList.formList.gender" name="gender" class="mr-4" value="2">無所屬</b-form-radio>
                                </div>
                                <div class="invalid-feedback">
                                    <span v-for="(msg,index) in validateMsg.gender" :key="index">{{msg}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label">適用部位</label>
                            <div class="col-10">
                                <div class="d-flex py-1" :class="{'is-invalid': validateMsg.gender != ''}">
                                    <b-form-radio v-model="dataList.formList.part" name="part" class="mr-4" value="0">頭</b-form-radio>
                                    <b-form-radio v-model="dataList.formList.part" name="part" class="mr-4" value="1">脖子</b-form-radio>
                                    <b-form-radio v-model="dataList.formList.part" name="part" class="mr-4" value="2">肩膀</b-form-radio>
                                    <b-form-radio v-model="dataList.formList.part" name="part" class="mr-4" value="3">手腕</b-form-radio>
                                    <b-form-radio v-model="dataList.formList.part" name="part" class="mr-4" value="4">手</b-form-radio>
                                    <b-form-radio v-model="dataList.formList.part" name="part" class="mr-4" value="5">上身</b-form-radio>
                                    <b-form-radio v-model="dataList.formList.part" name="part" class="mr-4" value="6">下身</b-form-radio>
                                    <b-form-radio v-model="dataList.formList.part" name="part" class="mr-4" value="7">全身</b-form-radio>
                                    <b-form-radio v-model="dataList.formList.part" name="part" class="mr-4" value="8">腳</b-form-radio>
                                    <b-form-radio v-model="dataList.formList.part" name="part" class="mr-4" value="9">飾品</b-form-radio>
                                </div>
                                <div class="invalid-feedback">
                                    <span v-for="(msg,index) in validateMsg.part" :key="index">{{msg}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label">販售價格</label>
                            <div class="col-10">
                                <input type="number" min='0' class="form-control" :class="{'is-invalid': validateMsg.price != ''}" id="title" v-model="dataList.formList.price">
                                <div class="invalid-feedback">
                                    <span v-for="(msg,index) in validateMsg.price" :key="index">{{msg}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header">製作資訊(每次)</div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label>使用材料</label>
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="form-group col-3 py-1">
                                                <label class="col-12 text-center"><i class="fas fa-bug"></i></label>
                                                <input type="number" min='0' class="form-control" :class="{'is-invalid': validateMsg.bug != ''}" v-model="dataList.formList.bug">
                                                <div class="invalid-feedback">
                                                    <span v-for="(msg,index) in validateMsg.bug" :key="index">{{msg}}</span>
                                                </div>
                                            </div>
                                            <div class="form-group col-3 py-1">
                                                <label class="col-12 text-center"><i class="fas fa-feather"></i></label>
                                                <input type="number" min='0' class="form-control" :class="{'is-invalid': validateMsg.feather != ''}" v-model="dataList.formList.feather">
                                                <div class="invalid-feedback">
                                                    <span v-for="(msg,index) in validateMsg.feather" :key="index">{{msg}}</span>
                                                </div>
                                            </div>
                                            <div class="form-group col-3 py-1">
                                                <label class="col-12 text-center"><i class="fas fa-cannabis"></i></label>
                                                <input type="number" min='0' class="form-control" :class="{'is-invalid': validateMsg.cannabis != ''}" v-model="dataList.formList.cannabis">
                                                <div class="invalid-feedback">
                                                    <span v-for="(msg,index) in validateMsg.cannabis" :key="index">{{msg}}</span>
                                                </div>
                                            </div>
                                            <div class="form-group col-3 py-1">
                                                <label class="col-12 text-center"><i class="fas fa-gem"></i></label>
                                                <input type="number" min='0' class="form-control" :class="{'is-invalid': validateMsg.gem != ''}" v-model="dataList.formList.gem">
                                                <div class="invalid-feedback">
                                                    <span v-for="(msg,index) in validateMsg.gem" :key="index">{{msg}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-2 col-form-label">消耗體力</label>
                                    <div class="col-4">
                                        <input type="number" min='0' class="form-control" :class="{'is-invalid': validateMsg.stamina != ''}" id="title" v-model="dataList.formList.stamina">
                                        <div class="invalid-feedback">
                                            <span v-for="(msg,index) in validateMsg.stamina" :key="index">{{msg}}</span>
                                        </div>
                                    </div>
                                    <label class="col-2 col-form-label">生產數量</label>
                                    <div class="col-4">
                                        <input type="number" min='0' class="form-control" :class="{'is-invalid': validateMsg.amount != ''}" id="title" v-model="dataList.formList.amount">
                                        <div class="invalid-feedback">
                                            <span v-for="(msg,index) in validateMsg.amount" :key="index">{{msg}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-2 col-form-label">花費時間</label>
                                    <div class="col-4">
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
                                    <label class="col-2 col-form-label">可獲得經驗值</label>
                                    <div class="col-4">
                                        <input type="number" min='0' class="form-control" :class="{'is-invalid': validateMsg.experience != ''}" id="title" v-model="dataList.formList.experience">
                                        <div class="invalid-feedback">
                                            <span v-for="(msg,index) in validateMsg.experience" :key="index">{{msg}}</span>
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
                'submit'
            ])   
        }
    }
</script>
