<template>
    <div class="container">
        <h1>Login</h1>
        <div class="jumbotron">
            <form>
                <div class="form-group">
                    <label for="user">Name:</label>
                    <input name="user" v-model="login" id="user" type="text" class="form-control"/>
                </div>
                <div class="form-group">
                    <label for="pwd">Password:</label>
                    <input name="password" v-model="password" type="password" class="form-control" id="pwd"/>
                </div>
                <a @click="sendRequest" class="btn btn-primary">{{ loading ? 'Loading' : 'Войти' }}</a>
                <p class="message">{{message}}</p>
            </form>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name: 'login',
    data() {
        return {
            message: "",
            login: "",
            password: "",
            loading: false
        }
    },
    components: {
    },
    methods: {
        ...mapActions('user', [
            'loginUser',
        ]),
        sendRequest() {
            this.loading = true;
            this.loginUser({username: this.login, password: this.password}).then((message) => {
                this.message = message.text;
                this.loading = false;

                if (message.status === 'ok') {
                    setTimeout(() => {
                        this.$router.push({name: 'chat'});
                    }, 500)
                }
            })
        }
    }

}
</script>

<style>

</style>
