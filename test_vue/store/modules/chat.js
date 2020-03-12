import axios from 'axios'

//const host = 'http://192.168.100.13:3001';
//const host = 'https://egoeast.xyz';
const host = '';
// initial state
const state = {
    channels: [],
    activeChannel: null,
    messages: []
};

// getters
const getters = {

};

// actions
const actions = {
    getChannels({commit}) {
        return axios.get(host + '/api/channels/')
            .then(
                (response) => {
                    console.log(response.data);
                    commit('setChannels', response.data.channels);
                }
            )
            .catch((error) => {
                console.log(error);
            });
    },
    getChannelMessages({commit}, id) {
        return axios.get(host + '/api/channel-messages/', {params: {id: id}})
            .then(
                (response) => {
                    console.log(response.data);
                    commit('setChannelMessages', response.data.messages);
                }
            )
            .catch((error) => {
                console.log(error);
            });
    },
    setActiveChannel({commit}, id) {
        commit('setActiveChannel', id);
    },
    addMessage({commit}, message){
        commit('pushMessage', message);
    },

    addChannel({commit}, name) {
        return axios.post(host + '/api/add-channel/', {name: name})
            .then(
                (response) => {
                    console.log(response.data);
                    commit('pushChannel', response.data.channel);
                }
            )
            .catch((error) => {
                console.log(error);
            });
    },
    parseUrl({commit}, url) {
        return axios.get(host + '/api/parse-url/', { params: {url: url}})
            .then(
                (response) => {
                    console.log(response.data);
                    if (response.data.success) {
                        return response.data.data
                    }
                    return false;
                }
            )
            .catch((error) => {
                console.log(error);
            });
    },
};

// mutations
const mutations = {
    setChannels(state, channels) {
        state.channels = channels;
    },
    setActiveChannel(state, id) {
        state.activeChannel = id;
    },
    setChannelMessages(state, messages) {
        state.messages = messages;
    },
    pushMessage(state, message) {
        state.messages.push(message);
        console.log(state.messages);
    },
    pushChannel(state, channel) {
        state.channels.push(channel);
    }

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}


