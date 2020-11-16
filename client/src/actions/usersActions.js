import axios from 'axios'
import {GET_USERS, USERS_LOADING, GET_USER} from './types'

export const getAllUsers = () => dispatch => {
    dispatch(setUserLoading());
    axios.get('/api/users/all')
        .then(res => dispatch({
            type: GET_USERS,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_USERS,
            payload: null
        }));
};

export const getSingleUser = (id) => dispatch => {
    axios.get(`/api/users/${id}`)
        .then(res => dispatch({
            type: GET_USER,
            payload: res.data
        }))
        .catch(err =>dispatch({
            type: GET_USER,
            payload: null
        }))
}

//Users Loading 
export const setUserLoading = () => {
    return{
        type: USERS_LOADING
    };
};