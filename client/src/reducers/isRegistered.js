import { IS_REGISTERED } from '../actions/types';

const initialState = {
    isRegistered: false
}

export default function(state = initialState, action){
    switch(action.type){
        case IS_REGISTERED:
            return{
                ...state,
                isRegistered: action.payload
            }
        default:
            return state;
    }
}