<template>
<div id="main-content" class="container-fluid">
    <header-nav />
    home
</div>
</template>
<script>
import HeaderNav from '../_base/headerNav.vue'
export default {
    mounted() {
        console.log('Component "'+this.$route.name+'" mounted.')
        this.$emit('updateCurrentPath', this.$route.path)
    },
    components: {
        'header-nav': HeaderNav
    }
}
</script>