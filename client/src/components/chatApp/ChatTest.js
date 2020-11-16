import React, { Component } from 'react';
import {connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getChats} from '../../actions/chatActions';
import isEmpty from '../../validation/is-empty';
import ChatItems from './ChatItems';

class ChatTest extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }

    componentDidMount(){
        this.props.getChats();
    }
    render() {

         const {chats} = this.props.chat;
        let chatItems, receiver ;

        if(isEmpty(this.props.users.user)){
            chatItems = <h3 className="no-selection">Your messages appear here</h3>
        }else{
            chatItems = chats.map(chat => (
                <ChatItems
                  key={chat._id}
                  sender_id={this.props.auth.user.id}
                  receiver_id={this.props.users.user[0]._id}
                  chat={chat}
                />
            ))         
        }

        return (
            <div>
                {chatItems}
            </div>
        )
    }
}

ChatTest.propTypes = {
    users: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    chat: PropTypes.object.isRequired,
    getChats: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    users: state.users,
    chat: state.chat,
    auth: state.auth
})

export default connect(mapStateToProps, {getChats})(ChatTest);