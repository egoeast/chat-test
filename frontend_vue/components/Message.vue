<template>
    <div>
        <b>{{message.username}}</b>  <span>{{getDate}}</span>
        <p>{{message.text}}</p>
        <ul v-if="message.attachments">
            <li v-for="(file,index) in message.attachments">{{file.realName}}</li>
        </ul>
    </div>
</template>

<script>
    import moment from "moment"

    export default {
        name: "message",
        props: {
            message: {
                type: Object,
                required: true
            }
        },
        computed: {
            getDate() {
                let date = moment(this.message.created);
                return date.format('LT');
            }
        },
        created() {
            let date = moment(this.message.created);
            date.format( 'MM-DD-YYYY');
        }
    }
</script>

<style scoped>

</style>