<template>
    <div>
        <p>
            {{files.length > 1 ? files.length + " files" : files[0].realName }}
            <a href="" @click.prevent="opened = !opened">{{opened ? 'hide' : 'open'}}</a>
        </p>

        <ul class="message-file-list" v-if="files && opened">
            <li v-for="(file,index) in files">
                <div v-if="isImage(file)">
                    <a :href="'/api/download-file/' + file._id">
                        <img class="file-image" :src="'/api/download-file/' + file._id"/>
                    </a>
                </div>
                <div v-else>
                    <a :href="'/api/download-file/' + file._id">
                        <img class="file-image" src="/i/icons-file.png"/>
                    </a>
                </div>

            </li>
        </ul>
    </div>
</template>

<script>
    export default {

        name: "file-list",
        data() {
            return {
                opened: true
            }
        },
        props: {
            files: {
                type: Array,
                default: () => {
                    return [];
                }
            }
        },
        methods: {
            handleClick(index) {
                console.log(this.files[index]);
            },
            isImage(file) {
               return file.type.match('image')
            }
        },


    }
</script>

<style scoped>
    .message-file-list {
        list-style: none;
        display: flex;
    }
    .file-image {
        border: 1px solid #c0c0c0;
        height: 200px;
        border-radius: 5px;
        margin-right: 5px;
    }

</style>