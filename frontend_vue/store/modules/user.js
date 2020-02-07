import axios from 'axios'

// initial state
const state = {
    id: 0,
    name: ''
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
        return axios.get('/api/')
            .then(
                (response) => {
                    let user = response.data.user;
                    if (user) {
                        commit('setUserName', user.username);
                    } else {
                        /*this.setState({
                            message: 'Error'
                        });*/
                    }
                }
            )
            .catch((error) => {
                console.log(error);
            });
    },
    loginUser({commit}, {username, password}) {
        return axios.post('/api/login', {
            password: password,
            username: username
        })
            .then(
                (response) => {
                    let data = response.data;
                    //console.log(data.status);
                    if (data.status === 200) {
                        commit('setUserName', data.username);
                        return data.text;
                    } else {
                        return data.text;
                    }
                }
            )
            .catch((error) => {
                console.log(error);
            });
    },
    logoutUser({commit}) {
        axios.post('/api/logout')
            .then(
                (response) => {
                    let data = response.data;
                    if (data.status === 200) {
                        commit('setUserName', '')
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
    setUserName(state, username) {
        state.name = username;
    },

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}


