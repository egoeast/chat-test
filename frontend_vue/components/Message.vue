<template>
    <div>
        <b>{{message.username}}</b>  <span>{{getDate}}</span>
        <p>{{message.text}}</p>
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