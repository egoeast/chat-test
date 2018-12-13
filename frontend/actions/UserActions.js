import {AUTH_USER, LOG_OUT} from '../constants/User'

export function authUser(name) {
    return (dispatch) => {
        dispatch({
            type: AUTH_USER,
            payload: name
        });
    }
}

export function logOut() {
    return (dispatch) => {
        dispatch({
            type: LOG_OUT,
        });
    }
}