<template>
    <div class="container">
        <h1>Chat</h1>
        <div class="row">
            <div class="col-md-2 jumbotron">
            <!--<ChannelList channels={this.props.channels} changeChannel={this.props.chatActions.changeChannel}
                         getChannelMessages={this.props.chatActions.getChannelMessages}/>-->
        </div>
        <div class="col-md-10">
            <div class="jumbotron">
                <h6 class="display-6"><!--{currentChannel && !this.props.fetching ? currentChannel.name : 'Loading'}--></h6>
                <messages :messages="messages"></messages>
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
import io from "socket.io-client"
import {mapState} from 'vuex'

let socket = io();

export default {

    name: 'chat',
    components: {
        Messages
    },
    data() {
        return {
            message: "",
            messages: [

            ],
            isFocus: false
        }
    },
    computed: {
        ...mapState({
            user: state => state.user.name,
            userId: state => state.user.id
        })
    },
    methods: {
        sendMessage() {
            if (this.message !== "") {
                socket.emit('chat message', {
                    channelId: 1,
                    userId: this.userId,
                    username: this.user,
                    text: this.message
                });
                this.message = ""
            }
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
