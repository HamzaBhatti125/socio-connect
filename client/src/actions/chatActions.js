import axios from 'axios';
import {GET_CHATS, CHAT_LOADING, SEND_MSG, GET_ERRORS, CLEAR_ERRORS} from './types';

//Get All Chats
export const getChats = () => dispatch => {
    // dispatch(chatLoading());
    axios.get("api/chat")
    .then((res) => {
      dispatch({
        type: GET_CHATS,
        payload: res.data
      })
    }
    )
    .catch(err => 
        dispatch({
            type: GET_CHATS,
            payload: null
        })
    );
}

//Send Message 
export const sendMsg = (msgData) => dispatch => {
    dispatch(clearErrors());
    axios.post("api/chat/send",msgData)
        .then(res => { 
            dispatch({
                type: SEND_MSG,
                payload: res.data
            })
            dispatch(getChats())
        })
        
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
    ;
};


export const chatLoading = () => {
    return{
        type: CHAT_LOADING,
    }
}
//Clear errors in text field
export const clearErrors = () => {
    return{
        type: CLEAR_ERRORS,
    }
}
