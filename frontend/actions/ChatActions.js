import {CHANGE_CHANNEL, GET_CHANNELS, GET_CHANNEL_MESSAGES, RESEIVE_MESSAGE} from "../constants/Chat";
import axios from "axios";

export function changeChannel(channelId) {
    return (dispatch) => {
        dispatch({
            type: CHANGE_CHANNEL,
            payload: channelId
        })
    }
}

export function getChannels() {
        return (dispatch) => {
        return axios.get('api/channels')
            .then( (response) => {
                dispatch({
                    type: GET_CHANNELS,
                    payload: response.data.channels
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

}

export function getChannelMessages(id) {
    return (dispatch) => {
        return axios.get('api/get-channel-messages/', {
            params: {
                channelId: id
            }
        })
            .then( (response) => {
                dispatch({
                    type: GET_CHANNEL_MESSAGES,
                    payload: response.data.messages,
                    channelId: id
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export function reseiveMessage(message) {
    return (dispatch) => {
        dispatch({
            type: RESEIVE_MESSAGE,
            payload: message
        })
    }
}