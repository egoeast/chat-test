import axios from 'axios'

//const host = 'http://192.168.100.13:3001';
const host = '';
// initial state
const state = {
    id: 0,
    name: '',
};

// getters
const getters = {

};

// actions
const actions = {
  /*  getFaq({commit}) {
        commit('setFaq', []);
        commit('setLoading', true);
        //todo: для симуляции загрузки, потом удалить
        setTimeout(() => {
            axios.get('/api/faq-questions.json')
                .then((response) => {
                    commit('setFaq', response.data.faq);
                    commit('setLoading', false);
                })
                .catch((response) => {
                    console.log(response);
                    this.dispatch('pushNotification', {type: NOTIFICATION_DANGER, text: "Server error", time: 10000})
                });
        },1000);
    },*/
    checkUser({commit}) {
        return axios.get(host + '/api/')
            .then(
                (response) => {
                    let data =  response.data;
                    if (data.id) {
                        commit('setUser', {name: response.data.username, id: response.data.id});
                    } else {
                        console.log(response);
                    }
                }
            )
            .catch((error) => {
                console.log(error);
            });
    },
    loginUser({commit}, {username, password}) {
        return axios.post(host + '/api/login', {
            password: password,
            username: username
        })
            .then(
                (response) => {
                    let data = response.data;
                    //console.log(data);
                    if (data.status === 200) {
                        commit('setUser', {name: data.username, id: data.id});
                        return {status: 'ok', text: data.text};
                    } else {
                        return {status: 'fail', text: data.text};
                    }
                }
            )
            .catch((error) => {
                console.log(error);
            });
    },
    logoutUser({commit}) {
        axios.post(host + '/api/logout')
            .then(
                (response) => {
                    let data = response.data;
                    if (data.status === 200) {
                        commit('setUser', {name: '', id: 0})
                    } else {

                    }
                }
            )
            .catch((error) => {
                console.log(error);
            });
    }

};

// mutations
const mutations = {
    setUser(state, {name, id}) {
        state.name = name;
        state.id = id;
    },

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}


