<template>
<div id="main-content" class="container-fluid">
    <header-nav />
    <div class="card-columns">
        <div class="card" v-for="(area, index) in dataList.selectList.areaList" :key="index">
            <div class="card-header">
                {{area.title}}
            </div>
            <div class="card-body">
                <ul class="list-group" v-if="area.enable_stage.length > 0">
                    <li class="list-group-item list-group-item-action" v-for="(stage, index) in area.enable_stage" :key="index">
                        <div class="row mb-2">
                            <div class="col-8 d-flex align-items-center h6">{{stage.title}}</div>
                        </div>
                        <div class="row">
                            <div class="col-8 d-flex align-items-center">執行時間：{{stage.time}}</div>
                            <div class="col-4 d-flex align-items-center">
                                <b-button variant="outline-danger" class="btn-block btn-sm" v-if="stage.executor != undefined && stage.executor != null" v-on:click="cancelQuest(stage)">取消執行</b-button>
                                <b-button variant="outline-success" class="btn-block btn-sm" v-else v-on:click="showCharacterSelectModal(stage.stage_no)">GO</b-button>
                            </div>
                        </div>
                        <b-progress class="my-2" variant="info" :max="stage.millisecond" :value="stage.executor.goTimeValue" height="4px" v-if="stage.executor != undefined && stage.executor != null"></b-progress>
                        <div class="row" v-if="stage.executor != undefined && stage.executor != null">
                            <div class="col-12 text-right">
                                {{stage.executor.name}}執行中
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <b-modal centered v-model="modalStatus.characterSelect" title="select character">
        <ul class="list-group">
            <label class="list-group-item list-group-item-action" v-for="(character, index) in dataList.selectList.ownedCharacterList" :key="index">
                <input type="radio" name="character_select" :value="character.character_no" v-model="dataList.formList.character_no" v-if="character.stage_no == null">
                {{character.name}}<span class="badge badge-secondary ml-1" v-if="character.stage_no != null">任務執行中</span>
            </label>
        </ul>
        <template v-slot:modal-footer>
            <div class="col-6">
                <b-button class="btn-block" v-on:click="modalStatus.characterSelect = false">取消</b-button>
            </div>
            <div class="col-6">
                <b-button variant="success" class="btn-block" v-on:click="doQuest" :disabled="dataList.formList.character_no == null">出發</b-button>
            </div>
        </template>
    </b-modal>
    <b-modal centered v-model="modalStatus.finishedQuest" title="任務完成">
        <ul class="list-group">
            <li class="list-group-item list-group-item-action" v-for="(quest, index) in dataList.selectList.finishedQuestList" :key="index">
                恭喜，{{quest.executor.name}}執行{{quest.title}}完成!
                <div class="w-100">
                    <label>獲得以下戰利品</label>
                    <div class="row">
                        <div class="col-3">
                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-bug"></i></span>
                                </div>
                                <input type="text" class="form-control" v-model="quest.getResource.bug" disabled>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-feather"></i></span>
                                </div>
                                <input type="text" class="form-control" v-model="quest.getResource.feather" disabled>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-cannabis"></i></span>
                                </div>
                                <input type="text" class="form-control" v-model="quest.getResource.cannabis" disabled>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-gem"></i></span>
                                </div>
                                <input type="text" class="form-control" v-model="quest.getResource.gem" disabled>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-coins"></i></span>
                                </div>
                                <input type="text" class="form-control" v-model="quest.getResource.coins" disabled>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <template v-slot:modal-footer>
            <div class="col-6">
                <b-button class="btn-block" v-on:click="closeFinishedQuestModal">知道了</b-button>
            </div>
        </template>
    </b-modal>
</div>
</template>
<script>
import store from './_stores/app.js'
import HeaderNav from '../_base/headerNav.vue'
import { mapMutations, mapActions } from 'vuex'

export default {
    store,
    data() {
        return this.$store.state.indexData
    },
    mounted() {
        console.log('Component "'+this.$route.name+'" mounted.')
        this.$emit('updateCurrentPath', this.$route.path)
        this.initPage()
    },
    components: {
        'header-nav': HeaderNav
    },
    watch: {
        '$store.state.indexData.modalStatus.finishedQuest': (newVal) => {
            if(newVal == false) {
                store.state.indexData.dataList.selectList.finishedQuestList = []
            }
        },
        '$store.state.indexData.loginData': () => {
            HeaderNav.store.dispatch('headerNavData/getMemberData')
        },
    },
    methods: {
        ...mapMutations('indexData',[
            'closeFinishedQuestModal'
        ]),
        ...mapActions('indexData',[
            'cancelQuest',
            'doQuest',
            'initPage',
            'showCharacterSelectModal'
        ])
    }
}
</script>