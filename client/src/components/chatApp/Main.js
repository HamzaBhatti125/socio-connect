import React, { Component } from 'react';
import Users from './Users';
import ChatArea from './ChatArea';
import '../../App.css';

class Main extends Component {
    render() {
        return (
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4 space-user">
                <Users />
              </div>
              <div className="col-md-8 space-chat">
                <div className="">
                  <ChatArea />
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default Main;