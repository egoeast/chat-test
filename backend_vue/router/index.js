import Vue from 'vue'
import Router from 'vue-router'
//import NotFound from '../components/NotFound'
//import Login from '../components/Login.vue'
//import Chat from '../components/Chat.vue'
import Home from '../components/Home.vue'
import Users from '../components/Users.vue'
import Files from '../components/Files.vue'

Vue.use(Router);

export default
new Router({
    mode: 'history',
    routes: [
        {
            path: '/admin',
            name: 'home',
            component: Home,

        },
        {
            path: '/admin/users',
            name: 'users',
            component: Users
        },
        {
            path: '/admin/files',
            name: 'files',
            component: Files
        },

    ]
})
