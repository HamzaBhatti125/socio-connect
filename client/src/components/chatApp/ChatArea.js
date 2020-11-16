import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {sendMsg, getChats} from '../../actions/chatActions';
//import TextFieldGroup from '../common/TextFieldGroup';
import classnames from 'classnames';
import isEmpty from '../../validation/is-empty';
import ChatTest from './ChatTest';


class ChatArea extends Component {
    constructor(props){
        super(props);
        this.state={
            text: '',
            errors : {},
            receiver_name: null,
            receiver_id: null
        }
    }

    // componentDidMount(){
    //     this.props.getChats();
    //     console.log(this.props.chat)
    // }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({
                errors : nextProps.errors
            })
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit = (e) =>{
        e.preventDefault();
        
        const msgData = {
            sender_id: this.props.auth.user.id,
            sender_name: this.props.auth.user.name,
            text: this.state.text,
            receiver_id: this.props.users.user[0]._id,
            receiver_name: this.props.users.user[0].name
        }

        this.props.sendMsg(msgData)
        this.updateScroll()
        this.setState({
            text: ''
        })
     }

     updateScroll = () => {
       let objId = document.getElementById("chatId")
       if(objId !== null){
        objId.scrollTop = objId.scrollHeight;
       }
     }

    render() {
        const {errors} = this.state
        return (
          (isEmpty(this.props.users.user)? (
            <div className="text-chat">
            <ChatTest />
          </div>
          ): 
        
          (<div>
            {this.updateScroll()}
            <div className="user-header">
                <h4>
                {this.props.users.user[0].name}
                </h4>
            </div>
            <div className="text-chat" id="chatId">
              <ChatTest />
            </div>
            <div className="text-area">
              <form onSubmit={this.onSubmit}>
                <div className="type_msg">
                <div className="input_msg_write">
                  <input
                    className={classnames("write_msg", {
                      "is-invalid": this.state.errors.text
                    })}
                    placeholder="Write message"
                    name="text"
                    value={this.state.text}
                    onChange={this.onChange}
                  />
                  {this.state.errors && (
                    <div className="invalid-feedback">{errors.text}</div>
                  )}
                
                <button type="submit" className="btn_msg_btn">
                  {/* Send */}
                  <i className="fa fa-paper-plane-o" aria-hidden="true"/>
                </button>
                </div>
                </div>
              </form>
            </div>
          </div>)
          )  
          
        );
    }
}

ChatArea.propTypes = {
    users: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    chat: PropTypes.object.isRequired,
    sendMsg: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    getChats: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    users: state.users,
    auth: state.auth,
    chat: state.chat,
    errors: state.errors
})

export default connect(mapStateToProps, {sendMsg, getChats})(ChatArea);