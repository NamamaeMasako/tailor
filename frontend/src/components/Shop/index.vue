<template>
<div id="main-content" class="container-fluid">
    <header-nav />
    <div class="row">
        <div class="col-12">
            <b-card no-body class="w-100">
                <b-tabs pills card vertical nav-wrapper-class="col-3">
                    <b-tab title="Character">
                        <div class="card-group">
                            <div class="card" v-for="(character, index) in selectList.characterList" :key="index">
                                <div class="card-body">
                                    <h5 class="card-title">{{character.name}}</h5>
                                </div>
                                <div class="card-footer">
                                    <b-button variant="danger" disabled v-if="selectList.ownedCharacterList.indexOf(character.character_no) > -1">已擁有</b-button>
                                    <b-button variant="success" v-else>Get</b-button>
                                </div>
                            </div>
                        </div>
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