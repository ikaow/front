import propTypes from "prop-types";
import React, { Component } from "react";
import { fetchProfile } from "../ducks/profile";
import { connect } from "react-redux";
import PreLoader from "../components/PreLoader/PreLoader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Profile from "../components/Profile/Profile";

class ProfileContainer extends Component {
  componentDidMount() {
    this.props.dispatch(fetchProfile);
  }

  shouldComponentUpdate(nextProps) {
    return (
      Object.keys(this.props.profile.data).length === 0 ||
      this.props.profile.data !== nextProps.profile.data
    );
  }

  render() {
    const { loading, error, data } = this.props.profile;
    return loading ? (
      <PreLoader />
    ) : error ? (
      <ErrorMessage error={error} />
    ) : (
      Object.keys(data).length !== 0 && <Profile data={data} />
    );
  }
}

ProfileContainer.propTypes = {
  profile: propTypes.shape({
    data: propTypes.object.isRequired,
    loading: propTypes.bool.isRequired,
    error: propTypes.object
  }).isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.rootReducer.profile
  };
};

export default connect(mapStateToProps)(ProfileContainer);
