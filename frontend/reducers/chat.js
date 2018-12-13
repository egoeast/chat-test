import { CHANGE_CHANNEL, GET_CHANNELS } from "../constants/Chat";

const initialState = {
    currentChannel: "Not set",
    channels: []
};

export default function chat(state = initialState, action) {
    switch (action.type) {
        case CHANGE_CHANNEL:
            return {...state, currentChannel: action.payload };
        case GET_CHANNELS:
            return {...state, channels: action.payload };
        default:
            return state;
    }
}