import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {getSingleUser} from '../../actions/usersActions';
import classnames from 'classnames';
import '../../App.css'

class UserItems extends Component {
  state = {
    set: '',
  }
  
  getReceiver = (id) => {
      this.props.getSingleUser(id);
  } 

  active = (user) =>{
    this.setState({
      set: user.name
    })
  }
  
  render() {
        const {user} = this.props;

        return (
          // <div onClick={() => this.getReceiver(user._id)}>
          //   <div className="container p-0">
          //     <div className="row test-user">
          //       <div className="col-md-4 mt-2">
          //         <img
          //           className="rounded-circle d-none d-md-block"
          //           src={user.avatar}
          //           alt=""
          //         />
          //       </div>
          //       <div className="col-md-8">
          //         <p className="lead">{user.name}<span className={this.state.set === user.name ? "visible": "invisible"}>*</span></p>
          //       </div>
          //     </div>
          //   </div>
          // </div>

          <div  onClick={() => this.getReceiver(user._id)} className="inbox_chat">
            <div  className={"chat_list"} onClick={() => this.active(user)}>
              <div className="chat_people">
                <div className="chat_img">
                  {" "}
                  <img src={user.avatar} alt="" />{" "}
                </div>
                <div className="chat_ib">
                  <h5>
                    {user.name}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

UserItems.propTypes = {
    auth: PropTypes.object.isRequired,
    getSingleUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {getSingleUser})(UserItems);