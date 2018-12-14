import {AUTH_USER, LOG_OUT} from '../constants/User'
import axios from "axios/index";

export function authUser(name) {
    return (dispatch) => {
        dispatch({
            type: AUTH_USER,
            payload: name
        });
    }
}

export function logOut() {
    axios.post('/api/logout')
        .then(
            (response) => {
                let data = response.data;
                console.log(response.data);
                if (data.status === 200) {
                } else {
                }
            }
        )
        .catch((error) => {
            console.log(error);
        });
    return (dispatch) => {
        dispatch({
            type: LOG_OUT,
        });
    }
}