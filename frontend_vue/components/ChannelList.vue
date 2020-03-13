<template>
    <div @mouseover="handleHover(true)" @mouseleave="handleHover(false)" style="overflow: hidden">
        <vuescroll :ops="ops">
            <ul class="channel-list">
                <li v-for="(channel,index) in channels" :class="channel._id === activeChannel ? 'active' : ''"
                    :key="index" @click.prevent="channelClick(channel._id)"><a href="#"
                                                                               @click.prevent="channelClick(channel._id)">{{channel.name}}</a>
                </li>
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

<style lang="less">
    @import "../assets/constants";

    .channel-list {
        list-style: none;
        padding: 0;

        li {
            cursor: pointer;
            padding: 5px 10px 5px 15px;
            border-radius: 3px;
        }

        li.active {
            background: @brand-color-2;
        }

        li.active:hover {
            background: @brand-color-2;
        }

        li a {
            color: white;
            text-decoration: none;
        }

        li:hover {
            background: saturate(@brand-color-1, 20%);
        }
    }

</style>