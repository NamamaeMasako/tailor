<template>
<div id="main-content" class="container-fluid">
    <header-nav />
    <div class="row">
        <div class="col-12">
            <b-card no-body class="w-100">
                <b-tabs pills card vertical nav-wrapper-class="col-3">
                    <b-tab title="家具店">
                        <b-table :items="selectList.furnishingList" :fields="fieldList.furnishing" :per-page="dataList.perPage" :current-page="dataList.currentPage" show-empty empty-text="抱歉，這裡沒有資料!">
                            <template #cell(type_text)="data">
                                <span class="badge badge-secondary mr-1" v-for="(type_text, index) in data.item.type_text" :key="index">{{type_text}}</span>
                            </template>
                            <template #cell(buyBtn)="data">
                                <b-button variant="success" v-on:click="updateMemberFurnishing(data.item)">購買</b-button>
                            </template>
                        </b-table>
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
            'initPage',
            'updateMemberFurnishing'
        ])   
    }
}
</script>