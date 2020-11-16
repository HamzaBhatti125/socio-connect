import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';
import {getPosts } from '../../actions/postAction';
import PostFeed from './PostFeed';

class Posts extends Component {

    componentDidMount(){
        this.props.getPosts();
    }

    showAll = () =>{
        this.props.getPosts();
    }

    render() {

        const { posts, loading } = this.props.post;
        let postContent;

        if(posts === null || loading){
            postContent = <Spinner/>
        }else{
            if(posts.length > 0){
                postContent = <PostFeed posts={posts}/>
            }else{
                postContent = (
                  <div className="notFound">
                    <h4>No Post Found</h4>
                    <button className="btn btn-info" onClick={this.showAll}>Go Back To All Posts</button>
                  </div>
                );
            }
        }

        return (
            <div className="feed">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 m-auto">
                            <PostForm/>
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Posts.propType = {
    post: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
     post: state.post,

})

export default connect(mapStateToProps, { getPosts })(Posts);