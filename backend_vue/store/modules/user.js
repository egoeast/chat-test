import axios from 'axios'

//const host = 'http://192.168.100.13:3001';
//const host = 'https://egoeast.xyz';
const host = '';
// initial state
const state = {
    users: [],
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
    getAllUsers({commit}) {
        return axios.get(host + '/api/admin/all-users')
            .then(
                (response) => {
                    let data =  response.data;
                    if (data.users) {
                        commit('setUsers', data.users);
                    } else {
                        console.log(response);
                    }
                }
            )
            .catch((error) => {
                console.log(error);
            });
    },


};

// mutations
const mutations = {
    setUsers(state, users) {
        state.users = users;
    },

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}


