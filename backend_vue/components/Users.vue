<template>
    <div>
        <h1 class="bd-title" id="content">Users</h1>
        <div v-if="!loading">
            <ul class="user-list">
                <li v-for="(user, index) in users">
                    <a href="" @click.prevent="">{{user.username}}</a> <span> role: {{user.role}}</span>
                </li>
            </ul>
        </div>
        <p v-else>Loading...</p>
    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex"

    export default {
        name: "users",
        data() {
            return {
                loading: true
            }
        },
        computed: {
            ...mapState({
                users: state => state.user.users,
            }),
        },
        methods: {
            ...mapActions('user', [
                'getAllUsers'
            ])
        },
        created() {
            this.getAllUsers().then(() => {
                this.loading = false
            })
        }

    }
</script>

<style scoped>
    .user-list {
        list-style: none;
    }
</style>