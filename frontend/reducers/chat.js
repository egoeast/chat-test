import { CHANGE_CHANNEL } from "../constants/Chat";

const initialState = {
    currentChannel: "One-One"
};

export default function chat(state = initialState, action) {
    switch (action.type) {
        case CHANGE_CHANNEL:
            return {...state, currentChannel: action.payload, fetching:true };
        default:
            return state;
    }
}