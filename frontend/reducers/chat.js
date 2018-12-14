import {CHANGE_CHANNEL, GET_CHANNEL_MESSAGES, GET_CHANNELS, RESEIVE_MESSAGE} from "../constants/Chat";

const initialState = {
    currentChannel: "Not set",
    channels: [],
    messages: [],
};

export default function chat(state = initialState, action) {
    switch (action.type) {
        case CHANGE_CHANNEL:
            return {...state, currentChannel: action.payload };
        case GET_CHANNELS:
            return {...state, channels: action.payload };
        case GET_CHANNEL_MESSAGES:
            let newChannels = state.channels;
            let index = newChannels.find(channel => channel._id === state.currentChannel);
            //index ? newChannels[index].messages = action.payload : '';
            if (index) {
                index.messages = action.payload
            }
            return {...state, channels: newChannels };
        case RESEIVE_MESSAGE:
            let newMessages = state.messages;
            newMessages.push(action.payload);
            return {...state, messages: newMessages};
        default:
            return state;
    }
}