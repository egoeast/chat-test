<template>
    <div class="container chat">
        <h1>Chat</h1>
        <div class="row full-heigt">
            <div class="col-md-2 jumbotron">
                <channel-list @loaded="channelLoaded" ></channel-list>
        </div>
        <div class="col-md-10">
            <div class="jumbotron" style="height: 96%">
                <h6 class="display-6"></h6>
                <div v-show="activeChannel">
                    <div style="height: 450px">
                        <vuescroll ref="vs">
                            <messages :messages="messages"></messages>
                        </vuescroll>
                    </div>
                    <!--{emojiModal}-->
                    <div>
                    <textarea
                            placeholder="Type message..."
                            v-model="message"
                            class="form-control"
                            @keydown.enter.exact.prevent
                            @keyup.enter.exact="sendMessage"
                            @keyup.shift.enter.prevent="newLine"
                            rows="4"
                    ></textarea>
                    </div>
                    <div>
                        <button class="btn btn-danger" @click="openFilePopup">Add file</button>
                    </div>
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
import {Bus as VuedalsBus} from 'vuedals';

import {mapState, mapActions} from 'vuex'
import UploadFile from "./UploadFile.vue";

export default {

    name: 'chat',
    components: {
        ChannelList,
        Messages,
        vuescroll,
        UploadFile
    },
    data() {
        return {
            message: "",
            isFocus: true,
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
        ...mapActions('chat', [
            'addMessage'
        ]),
        sendMessage() {

            if (this.message.replace(/\r?\n/g, "") !== "") {
                this.$socket.emit('chat message', {
                    channelId: this.activeChannel,
                    userId: this.userId,
                    username: this.user,
                    text: this.message
                });
                this.message = "";
            }
        },
        scrollDown() {
            this.$refs['vs'].scrollTo(
                {
                    y: '100%'
                },
                10
            );
            console.log('scrollDown');
        },
        newLine() {
            //this.message += "\n";
        },
        channelLoaded() {
            console.log('loaded');
            setTimeout(() => {
                this.scrollDown();
            }, 200)
        },
        openFilePopup() {
            VuedalsBus.$emit('new', {
                component: UploadFile
            });
        }
    },
    created() {

        this.$socket.on('connect', () => {
            this.$socket.emit('storeUserData', {username: this.user});
        });

        window.focus();

        window.addEventListener('focus', () => {
            this.isFocus = true;
        });

        window.addEventListener('blur', () => {
            this.isFocus = false;
        });

        this.$socket.on('chat message', (msg) => {
            console.log(msg);
            this.addMessage(msg).then(() => {
                //console.log('Message added');
                //scroll down  if it is your message
                //if (msg.userId === this.userId) {
                    this.scrollDown();
                //}
            });

            //Show notification
            if (Notification.permission === "granted" && msg.userId !== this.userId && !this.isFocus) {
                let title = msg.username;
                new Notification(title, {body: msg.text});
            }
        });

    },

}
</script>

<style>
    .form-control {
        margin-top: 15px;
    }

    .chat {
        height: 650px;
    }
</style>
