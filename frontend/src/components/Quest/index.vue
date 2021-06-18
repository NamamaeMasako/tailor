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
                            <div class="col-8 d-flex align-items-center h6">{{stage.title}},{{stage.stage_no}}</div>
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
                        {{stage.executor.goTimeValue}}

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
                <input type="radio" name="character_select" :value="character.character_no" v-model="dataList.formList.character_no">
                {{character.name}}
            </label>
        </ul>
        <template v-slot:modal-footer>
            <div class="col-6">
                <b-button class="btn-block">取消</b-button>
            </div>
            <div class="col-6">
                <b-button variant="success" class="btn-block" v-on:click="doQuest">出發</b-button>
            </div>
        </template>
    </b-modal>
</div>
</template>
<script>
import store from './_stores/app.js'
import HeaderNav from '../_base/headerNav.vue'
import { mapActions } from 'vuex'

export default {
    store,
    data() {
        return this.$store.state.indexData
    },
    mounted() {
        console.log('Component "'+this.$route.name+'" mounted.')
        this.initPage()
    },
    components: {
        'header-nav': HeaderNav
    },
    methods: {
        ...mapActions('indexData',[
            'cancelQuest',
            'doQuest',
            'initPage',
            'showCharacterSelectModal'
        ])
    }
}
</script>