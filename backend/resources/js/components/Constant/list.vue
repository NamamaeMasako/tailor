<template>
    <div class="container">
        <nav class="my-3" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item" aria-current="page">資料管理</li>
                <li class="breadcrumb-item active" aria-current="page">參數</li>
            </ol>
        </nav>
        <b-alert :variant="alert.variant" dismissible :show="alert.dismissCountDown" v-on:dismissed="alert.dismissCountDown=0" v-on:dismiss-count-down="countDownChanged">
            <p>{{alert.message}}</p>
            <b-progress :variant="alert.variant" :max="alert.dismissSecs-1" :value="alert.dismissCountDown-1" height="4px"></b-progress>
        </b-alert>
        <div class="row justify-content-center">
            <div class="col-12">
                <b-card no-body>
                    <b-tabs pills card vertical nav-wrapper-class="col-3">
                        <b-tab :title="dataList.selectList.url[index]" v-for="(pageList, index) in dataList.items" :key="index" :active="index == 'stage'">
                            <ul class="list-group" v-if="index == 'stage'">
                                <li class="list-group-item" v-for="(constantList, i) in pageList" :key="i">
                                    <b-card-text>{{dataList.selectList.functionTitleList[index][i]}}</b-card-text>
                                    <div class="col-12" v-if="i == 'resource'">
                                        <div class="row">
                                            <div class="col-4" v-for="(constant, j) in constantList" :key="j">
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text">{{constant.text}}</span>
                                                    </div>
                                                    <input type="text" class="form-control" v-model="constant.usage[0]">
                                                    <div class="input-group-append">
                                                        <span class="input-group-text">~</span>
                                                    </div>
                                                    <input type="text" class="form-control" v-model="constant.usage[1]">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12 text-right">
                                                <b-button variant="success" v-on:click="updateConstant([index,i])">更新</b-button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <ul class="list-group" v-if="index == 'member'">
                                <li class="list-group-item" v-for="(constantList, i) in pageList" :key="i">
                                    <b-card-text>{{dataList.selectList.functionTitleList[index][i]}}</b-card-text>
                                    <div class="col-12" v-if="i == 'experience'">
                                        <div class="row">
                                            <div class="col-4" v-for="(constant, j) in constantList" :key="j">
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text">{{constant.text}}</span>
                                                    </div>
                                                    <input type="text" class="form-control" v-model="constant.usage">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12 text-right">
                                                <b-button variant="success" v-on:click="updateConstant([index,i])">更新</b-button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </b-tab>
                    </b-tabs>
                </b-card>
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
            return this.$store.state.listData
        },
         mounted() {
            console.log('Component "'+this.$route.name+'" mounted.')
            this.$emit('updateCurrentPath', this.$route.path)
            console.log(this)
            this.initPage()
        },
        methods: {
            ...mapMutations('listData',[
                'countDownChanged'
            ]),
            ...mapActions('listData',[
                'initPage',
                'updateConstant'
            ])   
        }
    }
</script>
