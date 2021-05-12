<template>
<nav>
    <div class="navbar navbar-expand-lg navbar-light shadow h-100">
        <a href="#" class="navbar-brand">
            Tailor
            <!-- <img src="" class="w-100 h-100" alt="logo"> -->
        </a>
        <button class="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#nav-header">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="nav-header">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link to="/Example" class="nav-link" v-bind:class="{'active':activePage == 'Example'}">
                        範例
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/Character" class="nav-link" v-bind:class="{'active':activePage == 'Character'}">
                        角色
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</nav>
</template>
<script>
    import { mapState, mapGetters } from 'vuex'
    export default {
        mounted() {
			console.log('Component "header-nav" mounted.')
            console.log(this)
		},
        computed: {
            ...mapState([
                'activePage'
            ]),
            ...mapGetters([
                'getActivePage'
            ])
        }
	}
</script>