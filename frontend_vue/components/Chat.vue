<template>
      <div style="position: relative;
    z-index: 1;
    height: 100%;
    overflow: hidden;

    background: #f9fafb;
    ">
        <div class="components-view">
            <div class="sidebar" :class="openedSidebar ? 'opened-sidebar' : 'closed-sidebar'">
                <channel-list @loaded="channelLoaded" ></channel-list>
            </div>
            <div style="width: 100%" v-show="activeChannel" @mouseover="handleHover(true)" @mouseleave="handleHover(false)">
                <vuescroll ref="vs" :ops="ops">
                    <messages :messages="messages"></messages>
                </vuescroll>
            </div>

        </div>
        <div style="width: 100%; height: 20%; padding: 10px">
              <textarea
                    placeholder="Type message..."
                    v-model="message"
                    class="form-control"
                    @keydown.enter.exact.prevent
                    @keyup.enter.exact="sendMessage"
                    @keyup.shift.enter.prevent="newLine"
                    rows="4"
            ></textarea>
            <button class="btn btn-danger" @click="openFilePopup">Add file</button>
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
            ops: {
                bar: {
                    keepShow: false
                }
            }
        }
    },
    computed: {
        ...mapState({
            user: state => state.user.name,
            userId: state => state.user.id,
            activeChannel: state => state.chat.activeChannel,
            messages: state => state.chat.messages,
            openedSidebar: state => state.openedSidebar
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
        },
        handleHover(val) {
            this.ops.bar.keepShow = val;
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
