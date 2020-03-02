<template>
    <div @mouseover="handleHover(true)" @mouseleave="handleHover(false)">
        <vuescroll :ops="ops">
            <ul class="channel-list">
                <li v-for="(channel,index) in channels" :class="channel._id === activeChannel ? 'active' : ''" :key="index"><a href="#" @click.prevent="channelClick(channel._id)">{{channel.name}}</a></li>
            </ul>
        </vuescroll>
        <button class="btn btn-primary" @click="addChannel">Add chanel</button>
    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex"
    import {Bus as VuedalsBus} from 'vuedals';
    import AddChannel from "./AddChannel.vue";
    import vuescroll from "vuescroll"

    export default {
        name: "channel-list",
        components: {
            AddChannel,
            vuescroll
        },
        data() {
            return {
                ops: {
                    bar: {
                        keepShow: false
                    }
                }
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
            handleHover(val) {
                this.ops.bar.keepShow = val;
            },
            channelClick(id) {
                this.getChannelMessages(id).then(() => {
                    this.setActiveChannel(id);
                    this.$emit('loaded');
                });
            },
            addChannel() {
                VuedalsBus.$emit('new', {
                    name: 'showing-add-channel-popup',
                    component: AddChannel
                });
            }
        },
        created() {
            this.getChannels().then(() => {
                //console.log('llist');
            })
        }
    }
</script>

<style scoped>
    .channel-list {
        list-style: none;
        padding: 0;
        height: 450px;
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