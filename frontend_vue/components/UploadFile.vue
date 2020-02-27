<template>
    <div class="container">
        <h3>File upload</h3>
        <div class="large-12 medium-12 small-12 cell">
            <textarea v-model="message"></textarea>
            <label>File
                <input type="file" id="file" ref="file" @change="handleFileUpload"/>
            </label>
            <button class="btn" @click="submitFile">Submit</button>
        </div>
    </div>
</template>

<script>
    import axios from "axios"

    export default {
        name: "upload-file",
        data() {
            return {
                file: '',
                message: ''
            }
        },
        methods: {
            handleFileUpload() {
                this.file = this.$refs['file'].files[0];
                console.log(this.$refs['file'].files);
            },
            sliceUpload(start ,end) {
                let fileReader = new FileReader(),
                    slice = this.file.slice(start, end);

                fileReader.readAsArrayBuffer(slice);
                fileReader.onload = (evt) => {
                    let arrayBuffer = fileReader.result;
                    this.$socket.emit('slice upload', {
                        name: this.file.name,
                        type: this.file.type,
                        size: this.file.size,
                        data: arrayBuffer
                    })
                };
            },
            submitFile()
            {
                this.sliceUpload(0, 100000);

                this.$socket.on('request slice upload', (data) => {
                    this.sliceUpload(data.currentSlice * 100000, (data.currentSlice + 1) * 100000);
                })
                    /*
                    this.$socket.on('request slice upload', (data) => {
                        var place = data.currentSlice * 100000,
                            slice = file.slice(place, place + Math.min(100000, file.size - place));

                        fileReader.readAsArrayBuffer(slice);
                    });*/

                //let formData = new FormData();
                //formData.append('file', this.$refs['file'].files[0]);
                //formData.append('message', this.message);
                //this.$socket.emit('file upload', {data: formData})

                /*axios.post( '/api/upload-file',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then(function(){
                    console.log('SUCCESS!!');
                })
                    .catch(function(){
                        console.log('FAILURE!!');
                    });*/
            }
        }
    }
</script>

<style scoped>

</style>