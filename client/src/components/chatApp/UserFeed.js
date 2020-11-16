import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getSingleUser} from '../../actions/usersActions';

class UserFeed extends Component {
    state = {
        receiverName : '',
    }

    getReceiver = (user) => {
        this.props.getSingleUser(user._id);
        this.setState({
            receiverName: user.name
        })
    } 
    
    render() {
        const { users, auth } = this.props;

        return users.map((user) => (
          <div
            onClick={() => this.getReceiver(user)}
            className="inbox_chat"
            key={user._id}
          >
            <div
              className={
                "chat_list " +
                (this.state.receiverName === user.name ? "active_chat" : "")
              }
            >
              <div className="chat_people">
                <div className="chat_img">
                  {" "}
                  <img src={user.avatar} alt="" />{" "}
                </div>
                <div className="chat_ib">
                  <h5>{user.name}</h5>
                </div>
                <span className={(auth.user.id === user._id ? "visible" : '')}></span>
              </div>
            </div>
          </div>
        ));
    }
}

UserFeed.propType = {
    auth: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    getSingleUser: PropTypes.func.isRequired,
}

const mapStatetoProps = state => ({
    auth: state.auth,
})

export default connect(mapStatetoProps , {getSingleUser})(UserFeed);