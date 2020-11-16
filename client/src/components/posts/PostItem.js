import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import Moment from 'react-moment';
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../actions/postAction";
import isEmpty from '../../validation/is-empty'

class PostItem extends Component {
  onDeleteClick = (id) => {
    this.props.deletePost(id);
  };

  onLikeClick = (id) => {
    this.props.addLike(id);
  };

  onunLikeClick = (id) => {
    this.props.removeLike(id);
  };

  findUserLike = (likes) => {
    const { auth } = this.props;
    if (likes.filter((like) => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { post, auth, showButtons } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            {/* <Link to={`/profile/${this.props.profile.profile.user.handle}`}>
            </Link> */}
            <br />
            <p className="text-center"><b>{post.name}</b></p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {!isEmpty(post.image) ? (
              <p>
                <img src={post.image} alt="" />
              </p>
            ) : null}
            <p><small>Posted on <Moment format="DD/MM/YYYY">{post.date}</Moment></small></p>
            {showButtons ? (
              <span>
                <button
                  type="button"
                  onClick={() => this.onLikeClick(post._id)}
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  type="button"
                  onClick={() => this.onunLikeClick(post._id)}
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                  {post.comments.length > 0 ? (
                    <span>({post.comments.length})</span>
                  ) : null}
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    onClick={() => this.onDeleteClick(post._id)}
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-trash-alt" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

//By default showButtons ko true rakhna hai tbhi default props used krengy
PostItem.defaultProps = {
  showButtons: true
}

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  profile : PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth, //for checking whose post is this also used for chatApp
  profile: state.profile,

});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
  PostItem
);
