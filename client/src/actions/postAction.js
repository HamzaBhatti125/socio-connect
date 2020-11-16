import axios from 'axios';
import {ADD_POST, GET_ERRORS, GET_POSTS, POST_LOADING, DELETE_POST, GET_POST, CLEAR_ERRORS} from './types';

//Add posts
export const addPost = (postData) => dispatch => {
    dispatch(clearErrors());
    axios.post('/api/posts', postData)
        .then(res => 
            dispatch({
                type: ADD_POST,
                payload: res.data
            })
        )
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
            })
        );
};

//Get Post
export const getPosts = () => dispatch => {
    dispatch(setPostLoading()); 
    axios.get('/api/posts')
        .then(res => 
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        )
        .catch(err => dispatch({
            type: GET_POSTS,
            payload: null     //Hum koi form wagera ni bhej rae tbhi get post call krwa k hi payload null krdiya
            })
        );
};

//Get Search Profiles
export const getSearchPost = (name) => dispatch => {
    dispatch(setPostLoading());
    axios.get(`/api/posts/search/${name}`)
        .then(res => dispatch({
            type: GET_POSTS,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_POSTS,
            payload: null
        }))
}

//Delete Post
export const deletePost = (id) => dispatch => {
    axios.delete(`/api/posts/${id}`)
        .then(res => 
            dispatch({
                type: DELETE_POST,
                payload: id
            })
        )
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
            })
        );
};

//Get Single Post through post id
export const getSinglePost = id => dispatch => {
    dispatch(setPostLoading())
    axios.get(`/api/posts/${id}`)
        .then(res => 
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch(err => dispatch({
            type: GET_POST,
            payload: null     //Hum koi form wagera ni bhej rae tbhi get post call krwa k hi payload null krdiya
            })
        );
};


//Add Like
export const addLike = (id) => dispatch => {
    axios.post(`/api/posts/like/${id}`)
        .then(res => 
            dispatch(getPosts())
        )
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
            })
        );
};

//Add DisLike
export const removeLike = (id) => dispatch => {
    axios.post(`/api/posts/unlike/${id}`)
        .then(res => 
            dispatch(getPosts())
        )
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
            })
        );
};


//Add Comment
export const addComment = (postId, newComment) => dispatch => {
    dispatch(clearErrors());
    axios.post(`/api/posts/comment/${postId}`, newComment)
        .then(res => 
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
            })
        );
};


//Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
    axios.delete(`/api/posts/comment/${postId}/${commentId}`)
        .then(res => 
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
            })
        );
};

//Set Loading state
export const setPostLoading = () => {
    return{
        type: POST_LOADING,
    }
}

//Clear errors in text field
export const clearErrors = () => {
    return{
        type: CLEAR_ERRORS,
    }
}


