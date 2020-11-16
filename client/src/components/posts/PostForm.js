import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextAreaGroup from '../common/TextAreaGroup';
import {addPost, getSearchPost} from '../../actions/postAction';
import classnames from 'classnames'

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      searchText: "",
      errors: {},
      imageURL: ""
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange1 = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSearchPost = (e) => {
    e.preventDefault();
    const text = this.state.searchText;
    this.props.getSearchPost(text);
    this.setState({
      searchText: ""
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { user } = this.props.auth; //yeh kam chatApp me b krna hoga

    const newPost = {
      text: this.state.text,
      image: this.state.imageURL,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addPost(newPost);
    this.setState({
      text: "",
      imageURL: ""
    });
  };

  onChange2 = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  file = (event) => {
    const input = event.target;
    // console.log("event",event.target.value)
    const reader = new FileReader();
    reader.onload = () => {
      console.log("onload ");

      const dataURL = reader.result;
      // const fileName = input.files[0].name
      this.setState({ imageURL: dataURL });
      // console.log("dataURL",dataURL.length)
      // this.encodeBase64(dataURL)
    };
    reader.onloadstart = () => {
      console.log("load start");
    };
    reader.onloadend = () => {
      console.log("load end");
    };
    reader.readAsDataURL(input.files[0]);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="post-parent card-header bg-info text-white">
            <div className="say">Say Something...</div>
            <div className="parentInPost active-cyan-3 active-cyan-4 mb-4">
              <form onSubmit={this.onSearchPost}>
                <div className="child-1">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search Post"
                    name="searchText"
                    value={this.state.searchText}
                    onChange={this.onChange1}
                    aria-label="Search"
                  />
                </div>
                <div className="child-2">
                  <button
                    className="btn clr"
                    disabled={this.state.searchText.length < 1 ? true : false}
                    type="submit"
                  >
                    <i className="fas fa-search" />
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaGroup
                  placeholder="Whats on your mind?"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange2}
                  error={errors.text}
                />
                <p className="file">
                  <input
                    style={{ display: "none" }}
                    id="fileName"
                    type="file"
                    onChange={this.file}
                  />{" "}
                  <button
                    className={classnames("btn btn-primary float-right", {
                      "btn-success": this.state.imageURL !== ""
                    })}
                    type="button"
                    onClick={() => document.getElementById("fileName").click()}
                  >
                    <i className="fas fa-camera mr-2" />
                    {this.state.imageURL === "" ? "Upload Image" : "Uploaded"}
                  </button>
                  <br />
                </p>
              </div>
              <button
                disabled={
                  this.state.text === "" && this.state.imageURL === ""
                    ? true
                    : false
                }
                type="submit"
                className="btn btn-dark"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    getSearchPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors : state.errors,
    auth: state.auth,
})

export default connect( mapStateToProps, { addPost,getSearchPost })((PostForm));