<template>
    <div class="container">
        <h1>Chat</h1>
        <div class="row">
            <div class="col-md-2 jumbotron">
                <channel-list ></channel-list>
        </div>
        <div class="col-md-10">
            <div v-show="activeChannel" class="jumbotron">
                <h6 class="display-6"><!--{currentChannel && !this.props.fetching ? currentChannel.name : 'Loading'}--></h6>
                <vuescroll ref="vs">
                    <messages :messages="messages"></messages>
                </vuescroll>
                <!--{emojiModal}-->
                <div class="input-group">
                    <textarea placeholder="Type message..." v-model="message" class="form-control" @keyup.enter.exact="sendMessage" @keyup.shift.enter.prevent="newLine" rows="4"></textarea>

                    <!--<div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button"
                                @click="sendMessage">Send
                        </button>
                    </div>-->
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>

import Messages from "./Messages.vue"
import ChannelList from "./ChannelList.vue";
import vuescroll from "vuescroll"

import io from "socket.io-client"
import {mapState} from 'vuex'

let socket = io();

export default {

    name: 'chat',
    components: {
        ChannelList,
        Messages,
        vuescroll
    },
    data() {
        return {
            message: "",
            isFocus: false
        }
    },
    computed: {
        ...mapState({
            user: state => state.user.name,
            userId: state => state.user.id,
            activeChannel: state => state.chat.activeChannel,
            messages: state => state.chat.messages
        })
    },
    methods: {
        sendMessage() {
            if (this.message !== "") {
                socket.emit('chat message', {
                    channelId: this.activeChannel,
                    userId: this.userId,
                    username: this.user,
                    text: this.message
                });
                this.message = "";
                this.scrollDown();

            }
        },
        scrollDown() {
            this.$refs['vs'].scrollTo(
                {
                    y: '100%'
                },
                10
            );
        },
        newLine() {
            //this.message += "\n";
        }
    },
    created() {

        socket = io();
        socket.on('connect', () => {
            socket.emit('storeUserData', {username: this.user});
        });

        window.focus();

        window.addEventListener('focus', function() {
            this.isFocus = true;
        });

        window.addEventListener('blur', function() {
            this.isFocus = false;
        });

        socket.on('chat message', (msg) => {
            console.log(msg);
            this.messages.push(msg);

            if (Notification.permission === "granted" && msg.userId !== this.userId && !this.isFocus) {
                let title = 'Message, Motherfucker!!!';
                new Notification(title, {body: msg.text});
            }
        });

    },
    mounted() {

    }

}
</script>

<style>
    .form-control {
        margin-top: 15px;
    }

</style>
