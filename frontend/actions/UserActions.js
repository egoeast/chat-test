import {AUTH_USER} from '../constants/User'

export function authUser(year) {
    return (dispatch) => {
        dispatch({
            type: AUTH_USER,
            payload: year
        });
    }
}