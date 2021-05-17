<template>
    <div class="container">
        <nav class="my-3" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item" aria-current="page">角色</li>
                <li class="breadcrumb-item active" aria-current="page">新增</li>
            </ol>
        </nav>
        <b-alert variant="danger" dismissible :show="alert.dismissCountDown" v-on:dismissed="alert.dismissCountDown=0" v-on:dismiss-count-down="countDownChanged">
            <p>錯誤</p>
            <b-progress variant="danger" :max="alert.dismissSecs-1" :value="alert.dismissCountDown-1" height="4px"></b-progress>
        </b-alert>
        <div class="row justify-content-center">
            <div class="col-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between">
                        <b-button variant="info" class="text-light" href="/character/list"><i class="fa fa-arrow-left mr-1"></i>返回列表</b-button>
                    </div>
                    <div class="card-body">
                        <div class="form-group row">
                            <label for="name" class="col-sm-2 col-form-label">名字</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="name" v-model="dataList.formList.name">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">性別</label>
                            <div class="col-sm-10 d-flex">
                                <b-form-radio v-model="dataList.formList.gender" name="gender" class="col-1" value="0">女</b-form-radio>
                                <b-form-radio v-model="dataList.formList.gender" name="gender" class="col-1" value="1">男</b-form-radio>
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
            ...mapActions('createData',[
                'initPage',
                'submit',
                'countDownChanged'
            ])   
        }
    }
</script>
