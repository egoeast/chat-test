<template>
    <div class="message-container">
        <ul class="message-list">
            <li class="article-list__li" v-for="(message,index) in messages">
                <message :message="message"></message>
            </li>
        </ul>
    </div>

</template>

<script>

import Message from "./Message.vue";
export default {

    name: 'messages',
    props: {
        messages: {
            type: Array
        }
    },
    data() {
        return {
            /*messages: [
                {username: 'Vasia', text: "Hello World!"}
                ]*/
        }
    },
    components: {
        Message
    },
    methods: {

    }

}
</script>

<style>
    .message-list {
        list-style: none;
    }
</style>
