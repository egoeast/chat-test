<template>
    <nav class="bd-links collapse" id="bd-docs-nav" aria-label="Main navigation" style="">
        <div class="bd-toc-item active">
            <router-link class="bd-toc-link nav-link" to="/admin">Home</router-link>
            <ul class="nav bd-sidenav">
                <li class="active bd-sidenav-active">
                    <router-link class="nav-link" to="/admin/users">Users</router-link>
                </li>
                <li>
                    <router-link class="nav-link" :to="{ name: 'files'}">Files</router-link>
                </li>
            </ul>

        </div>
    </nav>
</template>

<script>
    export default {
        name: "sidebar-menu"
    }
</script>

<style scoped>

</style>