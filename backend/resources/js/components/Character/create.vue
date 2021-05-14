<template>
    <div class="container">
        <nav class="my-3" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item" aria-current="page">角色</li>
                <li class="breadcrumb-item active" aria-current="page">新增</li>
            </ol>
        </nav>
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
                                <input type="text" class="form-control" id="name">
                            </div>
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-center">
                        
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
                'initPage'
            ])   
        }
    }
</script>
