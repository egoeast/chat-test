import {AUTH_USER, LOG_OUT} from "../constants/User";

const initialState = {
    name: 'Anon',
    isAuthenticated: false,
};

export default function user(state = initialState,action) {
    switch ( action.type ) {
        case AUTH_USER:
            return { ...state, name:action.payload, isAuthenticated: true };
        case LOG_OUT:
            return { ...state, name:"Guest", isAuthenticated: false };
        default:
            return state;
    }
}