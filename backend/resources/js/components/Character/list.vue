<template>
    <div class="container">
        <nav class="my-3" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item" aria-current="page">角色</li>
                <li class="breadcrumb-item active" aria-current="page">清單</li>
            </ol>
        </nav>
        <div class="row justify-content-center">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">Example Component</div>

                    <div class="card-body">
                        I'm an example component.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import store from './stores/index.js' 
    import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
    export default {
        store,
        mounted() {
            console.log('Component "character" mounted.')
            console.log(this)
        },
        computed: {
            ...mapState('listData',[
                'parentPage',
                'activePage'
            ])
        }
    }
</script>
