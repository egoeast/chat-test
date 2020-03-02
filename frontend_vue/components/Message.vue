<template>
    <div>
        <b>{{message.username}}</b>  <span>{{getDate}}</span>
        <p>{{message.text}}</p>
        <file-list :files="message.attachments"></file-list>
    </div>
</template>

<script>
    import moment from "moment"
    import FileList from "./FileList.vue";

    export default {
        name: "message",
        components: {FileList},
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