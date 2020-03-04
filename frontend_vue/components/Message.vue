<template>
    <div>
        <b>{{message.username}}</b>  <span>{{getDate}}</span>
        <p v-html="messageText"></p>
        <file-list :files="message.attachments"></file-list>
        <attachment-list :attachments="attachments"></attachment-list>
    </div>
</template>

<script>
    import moment from "moment"
    import FileList from "./FileList.vue";
    import {mapActions} from "vuex"
    import AttachmentList from "./AttachmentList.vue";

    export default {
        name: "message",
        components: {AttachmentList, FileList},
        data() {
            return {
                messageText: '',
                attachments: []
            }
        },
        props: {
            message: {
                type: Object,
                required: true
            },
        },
        computed: {
            getDate() {
                let date = moment(this.message.created);
                return date.format('LT');
            }
        },
        methods: {
            ...mapActions('chat', [
                'parseUrl'
            ])
        },
        created() {
            this.messageText = this.message.text;
            if (this.message.text.match(/https?:\/\//)) {
                let regex = /https?:\/\/([a-z,A-Z,0-9,\.,\/,\-,_])*/g;
                let arr;
                let links = [];
                let messageArray = [];
                while ((arr = regex.exec(this.message.text)) !== null) {
                    console.log(arr);
                    links.push({start: regex.lastIndex - arr[0].length, text: arr[0]});
                    //console.log(`Found ${arr[0]}. Next starts at ${regex.lastIndex}.`);
                }

                let index = 0;
                links.forEach((link) => {
                    this.parseUrl(link.text).then((result) => {
                        if (result) {
                            this.attachments.push(result)
                        }
                    });
                    //this.messageText = this.messageText.replace(link, '<a target="_blank" href="' + link + '">' + link + '</a>')
                    messageArray.push({type: 'text', content: this.messageText.slice(index, link.start)});
                    index = link.start;
                    messageArray.push({type: 'link', content: this.messageText.slice(index, index + link.text.length)});
                    index = index + link.text.length;
                });

                messageArray.push({type: 'text', content: this.messageText.slice(index, this.messageText.length)});
                
                this.messageText = '';
                messageArray.forEach((item) => {
                    switch (item.type) {
                        case 'text':
                            this.messageText += item.content;
                            break;
                        case 'link':
                            this.messageText += '<a target="_blank" href="' + item.content + '">' + item.content + '</a>';
                            break;
                    }
                });
                //console.log(this.message.text.match(/https?:\/\/([a-z,A-Z,\.,\/])*/));
                console.log('URL!!!!');
            }
                
            let date = moment(this.message.created);
            date.format( 'MM-DD-YYYY');
        }
    }
</script>

<style scoped>

</style>