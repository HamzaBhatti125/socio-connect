import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextAreaGroup from '../common/TextAreaGroup';
import {addComment} from '../../actions/postAction';

class CommentBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: '',
            errors: {}
        };
    };

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({ errors : nextProps.errors});
        };
    };

    onSubmit = (e) => {
        e.preventDefault();
        
        const { user } = this.props.auth;   //yeh kam chatApp me b krna hoga
        const { postId } = this.props;

        const newComment = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        };

        this.props.addComment(postId,newComment);
        this.setState({ text: ''});
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() {

        const { errors } = this.state ; 

        return (
             <div className="post-form mb-3">
            <div className="card card-info">
              <div className="card-header bg-info text-white">
                Add a comment
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <TextAreaGroup 
                        placeholder="Make a reply"
                        name="text"
                        value={this.state.text}
                        onChange={this.onChange}
                        error={errors.text}
                    />
                  </div>
                  <button type="submit" className="btn btn-dark">Post</button>
                </form>
              </div>
            </div>
          </div>
        )
    }
}

CommentBox.propTypes = {
    addComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    errors : state.errors,
    auth: state.auth,
})

export default connect( mapStateToProps, { addComment })((CommentBox));