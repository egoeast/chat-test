import Vue from 'vue'
import App from './components/App.vue'
import store from './store/index'
import router from './router/index'
import {default as Vuedals} from 'vuedals';

Vue.use(Vuedals);

//import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

//import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'

//Vue.use(BootstrapVue)
//Vue.use(BootstrapVueIcons)

//import { CardPlugin } from 'bootstrap-vue'
//Vue.use(CardPlugin)

const genUniqueId = function (length) {
        return '_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 12);
    };

Vue.mixin({
    methods: { genUniqueId }
});


Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#root');
