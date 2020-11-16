import React, { Component } from 'react'

class ChatItems extends Component {
    render() {
        const {sender_id, receiver_id, chat} = this.props;
        if((sender_id === chat.sender_id && receiver_id === chat.receiver_id) || (sender_id === chat.receiver_id && receiver_id === chat.sender_id)){
            return (
              <div>
                <div
                  className={
                    (sender_id === chat.sender_id ? "test1" : "") + " test"
                  }
                >
                  {chat.text}
                </div>
                <div className="clearfix"></div>
              </div>
            );
        }else{
            return null
        }
    }
}

export default ChatItems;