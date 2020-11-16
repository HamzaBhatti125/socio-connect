import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';
import chatReducer from './chatReducer';
import userReducer from './userReducer';


export default combineReducers({
    auth : authReducer,
    errors : errorReducer,   //yeh poori state hai redux ki jo hum used krengy har jagah
    profile : profileReducer,
    post: postReducer,
    users: userReducer,
    chat: chatReducer
});