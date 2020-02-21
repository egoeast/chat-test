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
    components: {
        Message
    },
    methods: {

    },
    chanched() {
        console.log('changed');
    }

}
</script>

<style>
    .message-list {
        list-style: none;
    }
</style>
