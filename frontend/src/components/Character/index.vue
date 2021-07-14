<template>
<div id="main-content" class="container-fluid">
    <header-nav />
    <div class="row">
        <div class="col-12">
            <b-card no-body class="w-100">
                <b-tabs pills card vertical nav-wrapper-class="col-3">
                    <b-tab :title="character.name" v-for="(character, index) in dataList.selectList.characterList" :key="index">
                        <template v-slot:title>
                            {{character.name}}
                            <span class="badge badge-pill badge-success" v-if="dataList.selectList.ownedCharacterList.indexOf(character.character_no) > -1">
                                <i class="fas fa-check"></i>
                            </span>
                        </template>
                        <b-card-text>{{character}}</b-card-text>
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
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
        this.$emit('updateCurrentPath', this.$route.path)
        this.initPage()
    },
    components: {
        'header-nav': HeaderNav
    },
    methods: {
        ...mapActions('indexData',[
            'initPage'
        ])   
    }
}
</script>