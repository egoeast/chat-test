<template>
    <div>
      <h2>Hi, {{userName ? userName : 'Guest'}}</h2>
      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li v-if="isAuthenticated">
          <router-link v-if="!userName" to="/login">Login</router-link>
          <a href="" v-if="userName"  @click.prevent="logOut">Logout </a>
        </li>
        <li>
          <router-link to="/chat">Chat</router-link>
        </li>
      </ul>
      <hr/>
      <router-view></router-view>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {

    name: 'app',
    data() {
        return {
          isAuthenticated: true,
        }
    },
    computed: {
        ...mapState({
          userName: state => state.user.name
        })
    },
    components: {
    },
    methods: {
        ...mapActions('user', [
            'logoutUser',
            'checkUser'
        ]),
        logOut() {
            this.logoutUser().then(() => {
                this.$router.push({name: 'home'})
            });
        }
    },
    created() {
        this.checkUser().then(() => {
            if (!this.userName && this.$router.currentRoute.name === 'chat') {
                this.$router.push({name: 'home'});
            }
        });

    },
    beforeRouteUpdate (to, from, next) {
        console.log(to);
        console.log('dasd');
        if (!this.userName) next('/login');
        else next()
    },
    beforeRouteLeave (to, from, next) {
        const answer = window.confirm('Do you really want to leave? you have unsaved changes!');
        if (answer) {
            next()
        } else {
            next(false)
        }
    }

}
</script>

<style>

</style>
