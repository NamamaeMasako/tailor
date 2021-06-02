<template>
    <div class="col-12 jumbotron">   
        <h1 class="display-4 text-center">Tailor</h1>
        <div class="card">
            <div class="card-header">
                <div class="card-title h4 text-center">管理後台註冊</div>
            </div>
            <div class="card-body">
                <b-alert :variant="alert.variant" dismissible :show="alert.dismissCountDown" v-on:dismissed="alert.dismissCountDown=0" v-on:dismiss-count-down="countDownChanged">
                    <p>{{alert.message}}</p>
                    <b-progress :variant="alert.variant" :max="alert.dismissSecs-1" :value="alert.dismissCountDown-1" height="4px"></b-progress>
                </b-alert>
                <div class="form-group row">
                    <label for="name" class="col-2 col-form-label">名稱</label>
                    <div class="col-10">
                        <input type="text" class="form-control" id="name" v-model="dataList.formList.name">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="email" class="col-2 col-form-label">電子郵件</label>
                    <div class="col-10">
                        <input type="email" class="form-control" id="email" v-model="dataList.formList.email">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="password" class="col-2 col-form-label">密碼</label>
                    <div class="col-10">
                        <input type="password" class="form-control" id="password" v-model="dataList.formList.password">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="password_confirm" class="col-2 col-form-label">確認密碼</label>
                    <div class="col-10">
                        <input type="password" class="form-control" id="password_confirm" v-model="dataList.formList.password_confirm">
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <div class="row">
                    <div class="col-6">
                        <b-button variant="secondary" class="btn-block text-light" href="/login">返回</b-button>
                    </div>
                    <div class="col-6">
                        <b-button variant="success" class="btn-block" v-on:click="submit">送出</b-button>
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
            return this.$store.state.registerData
        },
         mounted() {
            console.log('Component "register" mounted.')
            console.log(this)
            this.initPage()
        },
        methods: {
            ...mapMutations('registerData',[
                'countDownChanged'
            ]),
            ...mapActions('registerData',[
                'initPage',
                'submit'
            ])   
        }
    }
</script>