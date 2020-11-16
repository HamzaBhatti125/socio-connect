import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import {getAllUsers} from '../../actions/usersActions';
import UserFeed from './UserFeed';
import '../../App.css'


class Users extends Component {

    componentDidMount(){
        this.props.getAllUsers();
    }

    

    render() {
        const {users , loading } = this.props.users;
        let userContent;

        if(users === null || loading){
            userContent = <Spinner/>
        }else{
            userContent = <UserFeed users={users}/>
        }
        return (
            <div className="users">
                <div className="container p-0">
                    <div className="row">
                        <div>
                            <div className="col-md-12">
                            {userContent}        
                            </div>       
                        </div>
                    
                    </div>
                </div>
            </div>
        )
    }
}

Users.propType = {
    getAllUsers: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    users: state.users
})

export default connect(mapStateToProps, {getAllUsers})(Users);