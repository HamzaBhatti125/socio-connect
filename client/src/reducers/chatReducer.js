import {GET_CHATS, CHAT_LOADING, SEND_MSG} from '../actions/types';

const initialState = {
    chats: [],
    chat: {},
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case CHAT_LOADING:
            return{
                ...state,
                loading: true
            }
        case SEND_MSG:
            return{
                ...state,
                chats: [action.payload, ...state.chats]
            }
        case GET_CHATS:
            return{
                ...state,
                chats: action.payload,
                loading: false
            }
        default:
        return state
    }
}