import {CHANGE_CHANNEL, GET_CHANNELS} from "../constants/Chat";
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