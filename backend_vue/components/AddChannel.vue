<template>
    <div class="container text-center">
        <h3>Add Channel</h3>
        <div v-show="!loading">
            <input v-model="channelName" @keydown.enter.exact.prevent="addChannelHandler" ref="channelName"/>
            <button class="btn-primary btn-primary" @click="addChannelHandler">Add</button>
        </div>
        <div v-show="loading">
            <p>{{message}}</p>
            <button class="btn btn-warning" @click="closePopup">Close</button>
        </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex"

    export default {
        name: "add-channel",
        data() {
            return {
                channelName: '',
                loading: false,
                message: 'Loading...'
            }
        },
        methods: {
            ...mapActions('chat', [
                'addChannel'
                ]),
            addChannelHandler() {
                if (!this.channelName) return false;
                this.loading = true;
                this.addChannel(this.channelName).then(() => {
                    this.message = 'Channel saved!'
                });
            },
            closePopup() {
                this.$vuedals.close({
                    $index: 0
                })
            }
        },
        mounted() {
            this.$refs['channelName'].focus();
        }
    }
</script>

<style scoped>

</style>