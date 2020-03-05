<template>
    <ul class="attachments-list" v-if="attachments">
        <li v-for="(attachment,index) in attachments">
            <attachment :attachment="attachment"></attachment>
        </li>
    </ul>
</template>

<script>
    import Attachment from "./Attachment.vue";
    export default {

        name: "attachment-list",
        components: {Attachment},
        props: {
            attachments: {
                type: Array,
                default: () => {
                    return [];
                }
            }
        },
        methods: {
            hideAttachment() {
                this.imageAttachmentHidden = !this.imageAttachmentHidden
            }
        },
    }
</script>

<style scoped>
    .attachments-list {
       list-style: none;
       padding-left: 5px;
    }

</style>