<template>
<div id="main-content" class="container-fluid">
    <header-nav />
    <div class="card-columns">
        <div class="card" v-for="(area, index) in dataList.areaList" :key="index">
            <div class="card-header">
                {{area.title}}
            </div>
            <div class="card-body">
                <ul class="list-group" v-if="area.enable_stage.length > 0">
                    <button type="button" class="list-group-item list-group-item-action btn" v-for="(stage, index) in area.enable_stage" :key="index">{{stage.title}}</button>
                </ul>
            </div>
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