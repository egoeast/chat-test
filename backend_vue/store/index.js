import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import chat from './modules/chat'
import file from './modules/file'

Vue.use(Vuex);

//const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state: {

    },
    actions: {

    },
    mutations: {

    },
    modules: {
        user,
        chat,
        file
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