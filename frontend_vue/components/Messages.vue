<template>
    <div class="message-container">
        <ul class="message-list">
            <li class="article-list__li" v-for="(message,index) in messages">
                <b>{{message.username}} : </b>
                {{message.text}}
            </li>
        </ul>
    </div>

</template>

<script>

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
    },
    methods: {

    }

}
</script>

<style>

</style>
