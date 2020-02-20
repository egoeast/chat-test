<template>
    <div>
      <h2>Hi, {{userName ? userName : 'Guest'}}</h2>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li>
              <router-link class="nav-link" to="/chat">Chat</router-link>
            </li>
            <li v-if="isAuthenticated">
              <router-link class="nav-link" v-if="!userName" to="/login">Login</router-link>
              <a href="" class="nav-link" v-if="userName"  @click.prevent="logOut">Logout </a>
            </li>
          </ul>
        </div>
      </nav>
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

        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
        }

        if (Notification.permission !== "denied") {
            Notification.requestPermission().then(function (permission) {

            });
        }


    },
    beforeRouteUpdate (to, from, next) {
        console.log(to);
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
