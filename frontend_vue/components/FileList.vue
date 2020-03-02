<template>
    <ul class="message-file-list" v-if="files">
        <li v-for="(file,index) in files">
            <div  v-if="isImage(file)" >
                <img class="file-image" :src="'/api/download-file/' + file._id"/>
                <br>
                <a class="file-image"  :href="'/api/download-file/' + file._id" >{{file.realName}}</a>
            </div>
            <a v-else :href="'/api/download-file/' + file._id" >{{file.realName}}</a>
        </li>
    </ul>
</template>

<script>
    export default {

        name: "file-list",
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
    }
    .file-image {
        width: 50%;
    }

</style>