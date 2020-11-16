import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { getSinglePost } from '../../actions/postAction';
import PostItem from '../posts/PostItem';
import CommentBox from './CommentBox';
import CommentFeed from './CommentFeed'

class Post extends Component {

    componentDidMount(){
         this.props.getSinglePost(this.props.match.params.id);
    }

    render() {  

        const { post, loading } = this.props.post ;

        let postContent;

        if(post === null || loading || Object.keys(post).length === 0){
            postContent = <Spinner/>
        }else{
            postContent = (
                <div>
                    <PostItem post={post} showButtons={false} />
                    <CommentBox postId={post._id} />
                    <CommentFeed postId={post._id} comments={post.comments} />
                </div>
            )
        }

        return (
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/feed" className="btn btn-light mb-3">Back to NewsFeed</Link>
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    getSinglePost: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    post: state.post
})

export default  connect(mapStateToProps, { getSinglePost })(Post);