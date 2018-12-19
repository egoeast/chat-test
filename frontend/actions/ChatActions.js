import {
    CHANGE_CHANNEL,
    GET_CHANNELS,
    GET_CHANNEL_MESSAGES,
    RESEIVE_MESSAGE,
    GET_CHANNEL_MESSAGES_REQUEST, GET_CHANNEL_MESSAGES_SUCCESS
} from "../constants/Chat";
import axios from "axios";

export function changeChannel(channelId) {
    return (dispatch) => {

        dispatch({
            type: GET_CHANNEL_MESSAGES_REQUEST,
            payload: channelId
        });

        setTimeout(() => {
            getChannelMessages(dispatch, channelId);
        /*    dispatch({
                type: GET_CHANNEL_MESSAGES_SUCCESS,
                payload: [1,2,3,4],
                channelId: channelId
            })*/
            dispatch({
                type: CHANGE_CHANNEL,
                payload: channelId
            });
        }, 500)
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

function getChannelMessages(dispatch, id) {
    return axios.get('api/get-channel-messages/', {
        params: {
            channelId: id
        }
    })
        .then( (response) => {
            dispatch({
                type: GET_CHANNEL_MESSAGES_SUCCESS,
                payload: response.data.messages,
                channelId: id
            })
        })
        .catch(err => {
            console.log(err);
        })
}

export function dispatchChannelMessages(id) {
    return (dispatch) => {
        getChannelMessages(dispatch, id)
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

