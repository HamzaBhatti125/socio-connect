import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getProfiles, getSearchProfiles } from '../../actions/profileActions';
import ProfileItem from './ProfileItem';

class Profiles extends Component {
    state = {
        text : ''
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const name = this.state.text;
        this.props.getSearchProfiles(name);
    }

    componentDidMount(){
        this.props.getProfiles();
    }

    render() {
        const { profiles, loading } = this.props.profile;
        let profileItems;

        if(profiles === null || loading){
            profileItems = <Spinner/>;
        }else{
            if(profiles.length > 0){
               profileItems = profiles.map(profile => (
                   <ProfileItem key={profile._id} profile={profile}/>
               ))
            }else{
                profileItems = <h4>No Profiles found...</h4>
            }
        }
        return (
          <div className="profiles">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="parent active-cyan-3 active-cyan-4 mb-4">
                    <form onSubmit={this.onSubmit}>
                      <div className="child-1">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Search Profile"
                          name="text"
                          value={this.state.text}
                          onChange={this.onChange}
                          aria-label="Search"
                        />
                      </div>
                      <div className="child-2">
                        <button className="btn btn-info" disabled={(this.state.text).length < 1 ? true : false} type="submit">
                          <i className="fas fa-search" />
                        </button>
                      </div>
                    </form>
                  </div>
                  <h1 className="display-4 text-center">
                    SocioConnect Profiles
                  </h1>
                  <p className="lead text-center">
                    Browse and connect with SocioConnectors
                  </p>
                  {profileItems}
                </div>
              </div>
            </div>
          </div>
        );
    }
}

Profiles.propTypes = {
    getProfiles: Proptypes.func.isRequired,
    getSearchProfiles: Proptypes.func.isRequired,
    profile: Proptypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfiles, getSearchProfiles })(Profiles);