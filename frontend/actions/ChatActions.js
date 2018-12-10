import {CHANGE_CHANNEL} from "../constants/Chat";

export function changeChannel(channelId) {
    return (dispatch) => {
        dispatch({
            type: CHANGE_CHANNEL,
            payload: channelId
        })
    }
}