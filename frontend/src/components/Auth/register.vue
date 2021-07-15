<template>
<div class="row">
    <div id="login" class="jumbotron col-12 m-0">
        <h1 class="display-4 text-center">Tailor</h1>
        <p class="lead text-center">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        <hr class="my-4">
        <p class="text-center">請輸入以下資料後按下送出，成為Tailor的一員!</p>
        <div class="row justify-content-center">
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <b-alert :variant="alert.variant" dismissible :show="alert.dismissCountDown" v-on:dismissed="alert.dismissCountDown=0" v-on:dismiss-count-down="countDownChanged">
                            <p>{{alert.message}}</p>
                            <b-progress :variant="alert.variant" :max="alert.dismissSecs-1" :value="alert.dismissCountDown-1" height="4px"></b-progress>
                        </b-alert>
                        <div class="form-group">
                            <label for="name">名稱</label>
                            <input type="text" id="name" class="form-control" :class="{'is-invalid': validateMsg.name != ''}" v-model="dataList.formList.name">
                            <div class="invalid-feedback">
                                <span v-for="(msg,index) in validateMsg.name" :key="index">{{msg}}</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="email">電子郵件</label>
                            <input type="email" id="email" class="form-control" :class="{'is-invalid': validateMsg.email != ''}" v-model="dataList.formList.email">
                            <div class="invalid-feedback">
                                <span v-for="(msg,index) in validateMsg.email" :key="index">{{msg}}</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="password">密碼</label>
                            <input type="password" id="password" class="form-control" :class="{'is-invalid': validateMsg.password != ''}" v-model="dataList.formList.password">
                            <div class="invalid-feedback">
                                <span v-for="(msg,index) in validateMsg.password" :key="index">{{msg}}</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="password_confirm">再次確認密碼</label>
                            <input type="password" id="password_confirm" class="form-control" :class="{'is-invalid': validateMsg.password_confirm != ''}" v-model="dataList.formList.password_confirm">
                            <div class="invalid-feedback">
                                <span v-for="(msg,index) in validateMsg.password_confirm" :key="index">{{msg}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="row">
                            <div class="col-6">
                                <b-button variant="secondary" href="/login" class="btn-block">返回</b-button>
                            </div>
                            <div class="col-6">
                                <b-button variant="success" class="btn-block" v-on:click="submit">送出</b-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>  
</template>
<script>
import store from './_stores/app.js'
import { mapMutations, mapActions } from 'vuex'
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