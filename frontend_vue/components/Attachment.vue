<template>

    <div class="attachment-body">
        <div>
            <b>{{attachment.ogSiteName}}</b>
        </div>
        <div>
            <span>
                <a target="_blank" rel="noreferrer noopener" :href="attachment.ogUrl">
                    <span>{{attachment.ogTitle}}</span>
                </a>
            </span>
        </div>
        <div>
            <p>{{attachment.ogDescription}}</p>
            <button v-if="attachment.ogImage.url" @click="hideAttachment">{{imageAttachmentHidden ? 'show' : 'hide'}}</button>
        </div>
        <div v-show="!imageAttachmentHidden">
            <img class="attachment-image" :src="attachment.ogImage.url">
        </div>
        <!--<p>{{attachment.ogImage.url}}</p>-->

    </div>

</template>

<script>
    export default {

        name: "attachment",
        data() {
            return {
                imageAttachmentHidden: false
            }
        },
        props: {
            attachment: {
                type: Object,
                default: () => {
                    return {};
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

<style lang="less">
    .attachment-body {
        border-left: 3px solid #0000008f;
        padding-left: 14px;
        margin-bottom: 5px;
    }
    .attachment-image {
        height: 300px;
        border: 1px solid #c0c0c0;
        border-radius: 5px;

        @media (max-width: 768px) {
            max-width: 600px;
        }

        @media (max-width: 450px) {
            max-width: 400px;
        }
    }



</style>