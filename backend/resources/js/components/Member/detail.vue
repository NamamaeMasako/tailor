<template>
    <div class="container">
        <nav class="my-3" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item" aria-current="page">會員</li>
                <li class="breadcrumb-item" aria-current="page">列表</li>
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
                        <b-button variant="info" class="text-light" href="/member/list"><i class="fa fa-arrow-left mr-1"></i>返回列表</b-button>
                        <b-form-checkbox v-model="editMode" name="check-button" class="col-form-label" switch>
                            <b v-if="editMode != true">編輯模式：關</b>
                            <b class="text-primary" v-else>編輯模式：開</b>
                        </b-form-checkbox>
                    </div>
                    <div class="card-body">
                        <div class="form-group row">
                            <label for="name" class="col-2 col-form-label">名稱</label>
                            <div class="col-10">
                                <input type="text" :class="{'is-invalid': validateMsg.name != '','form-control': editMode == true, 'form-control-plaintext': editMode != true}" :disabled="editMode != true" id="name" v-model="dataList.formList.name">
                                <div class="invalid-feedback">
                                    <span v-for="(msg,index) in validateMsg.name" :key="index">{{msg}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label">電子郵件</label>
                            <div class="col-sm-10">
                                <input type="text" class='form-control-plaintext' disabled v-model="dataList.formList.email">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label">驗證狀態</label>
                            <div class="col-sm-10" v-if="editMode != true">
                                <input type="text" class='form-control-plaintext' disabled v-model="dataList.formList.enable_text">
                            </div>
                            <div class="col-10" v-else>
                                <div class="d-flex py-1" :class="{'is-invalid': validateMsg.enable != ''}">
                                    <b-form-radio v-model="dataList.formList.enable" name="enable" class="mr-4" value="0">未驗證</b-form-radio>
                                    <b-form-radio v-model="dataList.formList.enable" name="enable" class="mr-4" value="1">已驗證</b-form-radio>
                                    <b-form-radio v-model="dataList.formList.enable" name="enable" class="mr-4" value="2">封鎖</b-form-radio>
                                </div>
                                <div class="invalid-feedback">
                                    <span v-for="(msg,index) in validateMsg.enable" :key="index">{{msg}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-2">
                                <b-button variant="info" class="text-light" v-b-modal.warehouse>查看倉庫</b-button>
                                <b-modal id="warehouse" title="倉庫" v-model="modalStatus.warehouse">
                                    <div class="form-group row">
                                        <label class="col-2 col-form-label">新增</label>
                                        <div class="col-7">
                                            <div class="d-flex py-1" :class="{'is-invalid': validateMsg.warehouse.costume != ''}">
                                                <b-select :options="selectList.costumeList" v-model="dataList.formList.warehouse.costume_no"></b-select>
                                            </div>
                                            <div class="invalid-feedback">
                                                <span v-for="(msg,index) in validateMsg.warehouse.costume" :key="index">{{msg}}</span>
                                            </div>
                                        </div>
                                        <div class="col-3 my-auto">
                                            <b-button variant="success" class="btn-block">送出</b-button>
                                        </div>
                                    </div>
                                    <p>無庫存</p>
                                    <template v-slot:modal-footer>
                                        <div class="col-12">
                                            <div class="row justify-content-center">
                                                <div class="col-3">
                                                    <b-button variant="secondary" class="btn-block" v-on:click="closeWarehouse">取消</b-button>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </b-modal>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 accordion">
                                <div class="card">
                                    <div class="card-header bg-info btn text-light text-left" data-toggle="collapse" data-target="#characters">
                                        持有角色
                                        <span class="close text-light"><i class="fa fa-angle-down"></i></span>
                                    </div>
                                    <div class="collapse" id="characters">
                                        <div class="card-body">
                                            <ul class="list-group" v-if="dataList.formList.member_character.length > 0">
                                                <li class="list-group-item" v-for="(character, index) in dataList.formList.member_character" :key="index">{{character.name}}</li>
                                            </ul>
                                            <p v-else>尚未持有任何角色</p>
                                        </div>
                                        <div class="card-footer">
                                            <b-button variant="success" v-b-modal.add-character>新增</b-button>
                                            <b-modal id="add-character" title="新增持有角色" v-model="modalStatus.addCharacter">
                                                <b-form-group label="選取:已持有，未選取:未持有" v-if="selectList.characterList.length > 0">
                                                    <b-form-checkbox-group :options="selectList.characterList" buttons button-variant="outline-primary" name="characters" v-model="dataList.formList.member_character"></b-form-checkbox-group>
                                                </b-form-group>
                                                <p v-else>無可使用角色</p>
                                                <template v-slot:modal-footer>
                                                    <div class="col-12">
                                                        <div class="row justify-content-center">
                                                            <div class="col-3">
                                                                <b-button variant="secondary" class="btn-block" v-on:click="closeAddCharacter">取消</b-button>
                                                            </div>
                                                            <div class="col-3">
                                                                <b-button variant="success" class="btn-block" v-on:click="updateCharacter">確認</b-button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </template>
                                            </b-modal>
                                        </div>
                                    </div>
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
            this.dataList.memberNo = this.$route.params.member_no
            this.initPage()
        },
        computed: {

        },
        methods: {
            ...mapMutations('createData',[
                'countDownChanged'
            ]),
            ...mapActions('detailData',[
                'closeAddCharacter',
                'closeWarehouse',
                'initPage',
                'submit',
                'updateCharacter'
            ])   
        }
    }
</script>
