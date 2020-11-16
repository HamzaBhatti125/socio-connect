import {GET_ERRORS, SET_CURRENT_USER} from './types';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import swal from 'sweetalert';

//Register user
export const registerUser = (userData, history) => dispatch => {
 axios.post('api/users/register', userData)
      .then(res => swal({
        title: "Success!",
        text: "You Registered succesfully!",
        icon: "success",
        button: "Done",
      }))
      .then( res => history.push('/login'))
      .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
};


//Login user
export const loginUser = userData => dispatch => {
    axios.post('api/users/login' , userData)
        .then( res => {
            //Save to localStorage
            const { token } = res.data;

            //Save token to ls
            localStorage.setItem('jwtToken', token);

            //Set Token to AuthHeader
            setAuthToken(token);// ab is token me hi name email avatar wagera hai so ab usko jwt decode se decode krengy

            // Decode token to fetch data
            const decoded = jwt_decode(token);
            //Set current user
            dispatch(setCurrentUser(decoded));

        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

export const setCurrentUser = decoded => {
    return{
        type : SET_CURRENT_USER,
        payload: decoded
    }
}

//Log user Out
export const logoutUser = () => dispatch => {
    //Remove Token from localStorage
    localStorage.removeItem('jwtToken');
    //Remove Auth Header for future Request
    setAuthToken(false);
    //Set currentUser to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
}