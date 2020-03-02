<template>
    <div class="container">
        <h3>File upload</h3>
        <div class="form-group" v-if="!loading">
            <div class="row">
                <textarea class="form-control" v-model="message"></textarea>
                <p>{{message}}</p>
            </div>
            <div class="row">
                <ul>
                    <li class="file-list" v-for="(file,index) in files">
                        {{file.name}} <span class="remove-file" @click="removeFile(index)">x</span>
                    </li>
                </ul>
            </div>
            <a href="#" @click.prevent="handleAddClick">Add files</a>
            <input class="form-control d-none" type="file" id="file" ref="file" @change="handleFileUpload" multiple/>
            <button class="btn" @click="submitFile">Submit</button>

            <!--<p class="upload-status">Uploaded: {{uploadedSize / totalSize * 100}} %</p>-->
            <p class="upload-status">total size: {{totalSize / 1000}} kb</p>

        </div>
        <div class="progress" v-else>
            <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style="width: 95%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex"

    const chunkSize = 1000000;

    export default {
        name: "upload-file",
        data() {
            return {
                loading: true,
                files: [],
                file: '',
                message: '',
                fileIndex: 0,
                status: false,
                totalSize: 0,
                uploadedSize: 0
            }
        },
        computed: {
            ...mapState({
                userId: state => state.user.id,
                userName: state => state.user.name,
                activeChannel: state => state.chat.activeChannel,
            })
        },
        methods: {
            handleAddClick() {
                this.$refs['file'].click()
            },
            removeFile(index) {
                this.files.splice(index, 1);
                this.countTotalSize();
            },
            countTotalSize() {
                this.totalSize = 0;

                this.files.forEach((file) => {
                    this.totalSize += file.size;
                });
            },
            handleFileUpload() {
                for (let i = 0; i < this.$refs['file'].files.length; i++) {
                    this.files.push(this.$refs['file'].files.item(i));
                    this.files[this.files.length - 1].fakeName = this.genUniqueId(16);
                }
                this.countTotalSize();
            },
            sliceUpload(sliceIndex, start ,end) {
                let fileReader = new FileReader(),
                slice = this.file.slice(start, end);

                fileReader.readAsArrayBuffer(slice);
                fileReader.onload = (evt) => {
                    let arrayBuffer = fileReader.result;
                    this.uploadedSize += chunkSize;

                    this.$socket.emit('slice upload', {
                        slice: sliceIndex,
                        chunkSize: chunkSize,
                        name: this.file.name,
                        fakeName: this.file.fakeName,
                        type: this.file.type,
                        size: this.file.size,
                        data: arrayBuffer,
                        userId: this.userId
                    })
                };
            },
            submitFile()
            {
                if (!this.files.length) return false;
                this.file = this.files[this.fileIndex];
                this.sliceUpload(0, 0, chunkSize);
            },
            nextFile() {
                this.fileIndex++;
                if (this.files[this.fileIndex]) {
                    this.submitFile();
                } else {

                    let attachmentArray = this.files.map((x) => {
                        return x._id
                    });

                    this.$socket.emit('chat message', {
                        channelId: this.activeChannel,
                        userId: this.userId,
                        username: this.userName,
                        text: this.message,
                        attachments: attachmentArray
                    });

                    this.files = [];
                    this.file = '';
                    this.fileIndex = 0;
                    this.message = "";
                }
            }
        },
        created() {
            this.$socket.on('end upload', (data) => {
                console.log('end upload');
                console.log(data);
                this.files[this.fileIndex]._id = data.file;
                this.nextFile();
            });

            this.$socket.on('request slice upload', (data) => {
                console.log('request slice upload');
                if (!this.file) return;
                this.sliceUpload(data.currentSlice, data.currentSlice * chunkSize, (data.currentSlice + 1) * chunkSize);
            });

            this.$socket.on('upload error', (error) => {
                console.log(error)
            });

        },
        destroyed() {
            this.$socket.off('request slice upload');
            this.$socket.off('end upload');
            this.$socket.off('upload error');
        }
    }
</script>

<style scoped>
    .file-list {
        list-style: none;
    }

    .remove-file {
        padding: 3px;
        font-weight: bold;
    }
    .remove-file:hover {
        cursor: pointer;
        color: #2d6ca2;
    }
</style>