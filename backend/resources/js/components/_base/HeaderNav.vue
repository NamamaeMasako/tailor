<template>
<nav class="bg-info">
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
                    <router-link to="/example" class="nav-link">
                        範例
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/character" class="nav-link">
                        角色
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</nav>
</template>
<script>
    export default {
        mounted() {
			console.log('Component "header-nav" mounted.')
		}
	}
</script>