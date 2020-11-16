import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {registerUser} from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    }
  }

  onChange = (e) =>{
    this.setState({
      [e.target.name] : e.target.value // this is targeted through name parameter in input field
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }

    this.props.registerUser(newUser, this.props.history)
    
  }

  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard')
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps){ // Means jb agr redux state me koi error aega tou woh error mapstatetoprops k through direct state me chalajayega using this function
    if(nextProps.errors){
      this.setState({
        errors : nextProps.errors
      })
    }
  }

    render() {

      const { errors } = this.state;

    return (
          <div className="register logInClass">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Sign Up</h1>
                  <p className="lead text-center">
                    Create your SocioApp account
                  </p>
                  <form noValidate onSubmit = {this.onSubmit}>
                  <TextFieldGroup
                        placeholder="Name"
                        name="name"
                        type="name"
                        value={this.state.name}
                        onChange={this.onChange}
                        error={errors.name}
                      />
                    <TextFieldGroup
                        placeholder="Email Address"
                        name="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        error={errors.email}
                        info = "This site uses Gravatar so if you want a profile image, use a Gravatar email"
                      />
                    <TextFieldGroup
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        error={errors.password}
                      />
                    <TextFieldGroup
                        placeholder="Confirm Password"
                        name="password2"
                        type="password"
                        value={this.state.password2}
                        onChange={this.onChange}
                        error={errors.password2}
                      />
                    <input
                      type="submit"
                      className="btn btn-info btn-block mt-4"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
    }
}


Register.propTypes = {
  registerUser : PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired,
  errors : PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({ // means we ye properties reducers se arai hain aur humein used krni hain yeh
  auth : state.auth,
  errors : state.errors,
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register)); //withRouter is used because we used history in register using action