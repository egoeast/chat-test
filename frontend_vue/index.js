import Vue from 'vue'
import App from './components/App.vue'
import store from './store/index'
import router from './router/index'

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/js/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

//import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

//import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'

//Vue.use(BootstrapVue)
//Vue.use(BootstrapVueIcons)

//import { CardPlugin } from 'bootstrap-vue'
//Vue.use(CardPlugin)

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#root');
