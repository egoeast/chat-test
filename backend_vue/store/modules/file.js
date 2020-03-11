import axios from 'axios'

//const host = 'http://192.168.100.13:3001';
//const host = 'https://egoeast.xyz';
const host = '';
// initial state
const state = {
    files: [],
};

// getters
const getters = {

};

// actions
const actions = {
    getAllFiles({commit}) {
        return axios.get(host + '/api/admin/all-files')
            .then(
                (response) => {
                    let data =  response.data;
                    if (data.files) {
                        commit('setFiles', data.files);
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
    setFiles(state, files) {
        state.files = files;
    },

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}


