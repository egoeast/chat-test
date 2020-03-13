import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import chat from './modules/chat'

Vue.use(Vuex);

//const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state: {
        openedSidebar: false
    },
    actions: {

    },
    mutations: {
        toggleSidebar(state) {
            console.log('toggle');
            state.openedSidebar = !state.openedSidebar
        }
    },
    modules: {
        user,
        chat
    },
    getters : {
/*
        popupVisible: state => {
            return state.popupVisible;
        },
*/
    }
    //strict: debug,
    //plugins: debug ? [createLogger()] : []
})