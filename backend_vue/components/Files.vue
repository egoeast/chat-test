<template>
    <div>
        <h1 class="bd-title" id="content">Files</h1>
        <div v-if="!loading">
            <ul class="user-list">
                <li v-for="(file, index) in files">
                    <a href="" @click.prevent="">{{file.realName}}</a> <span></span>
                </li>
            </ul>
        </div>
        <p v-else>Loading...</p>
    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex"

    export default {
        name: "files",
        data() {
            return {
                loading: true
            }
        },
        computed: {
            ...mapState({
                files: state => state.file.files,
            }),
        },
        methods: {
            ...mapActions('file', [
                'getAllFiles'
            ])
        },
        created() {
            this.getAllFiles().then(() => {
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