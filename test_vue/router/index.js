import Vue from 'vue'
import Router from 'vue-router'
//import NotFound from '../components/NotFound'
import Login from '../components/Login.vue'
import Chat from '../components/Chat.vue'
import Home from '../components/Home.vue'

Vue.use(Router);

export default
new Router({
    mode: 'history',
    routes: [
      /*  {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/chat',
            name: 'chat',
            component: Chat
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },*/
    ]
})
