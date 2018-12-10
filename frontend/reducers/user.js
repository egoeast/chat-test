import {AUTH_USER} from "../constants/User";

const initialState = {
    name: 'Anon',
    sername: 'Anonovich'
};

export default function user(state = initialState,action) {
    switch ( action.type ) {
        case AUTH_USER:
            return {...state, year:action.payload};
        default:
            return state;
    }
}