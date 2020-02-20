<template>
    <ul class="channel-list">
        <li v-for="(channel,index) in channels" :class="channel._id === activeChannel ? 'active' : ''" :key="index"><a href="#" @click.prevent="channelClick(channel._id)">{{channel.name}}</a></li>
    </ul>
</template>

<script>
    import {mapActions, mapState} from "vuex"
    
    export default {
        name: "channel-list",
        data() {
            return {
                //activeChannel: 1
            }
        },
        computed: {
            ...mapState({
                channels: state => state.chat.channels,
                activeChannel: state => state.chat.activeChannel,
                //userId: state => state.user.id
            })
        },
        methods: {
            ...mapActions('chat',[
                'getChannels',
                'setActiveChannel',
                'getChannelMessages'
            ]),
            channelClick(id) {
                this.getChannelMessages(id).then(() => {
                    this.setActiveChannel(id);
                    this.$emit('loaded');
                });
            }
        },
        created() {
            this.getChannels().then(() => {
                console.log('llist');
            })
        }
    }
</script>

<style scoped>
    .channel-list {
        list-style: none;
        padding: 0;
    }

    .channel-list li {
        padding: 5px;
        border-radius: 5px;
    }

    .channel-list. a {
        text-decoration: none;
    }

    .channel-list. a:hover {
        text-decoration: none;
    }

    .channel-list .active {
        background: #cbddef;
    }
</style>