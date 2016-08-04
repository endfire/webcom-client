import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { isUserAuthenticated } from '../selectors/auth';

export default function requiresAuth(WrappedComponent) {
  class UserAuthenticatedComponent extends Component {
    constructor(props) {
      super(props);
      this.checkAndRedirect = this.checkAndRedirect.bind(this);
    }

    componentDidMount() {
      this.checkAndRedirect();
    }

    componentDidUpdate() {
      this.checkAndRedirect();
    }

    checkAndRedirect() {
      if (!this.props.isUserAuthenticated) browserHistory.push('/admin-login');
    }

    render() {
      return (
        this.props.isUserAuthenticated ? <WrappedComponent {...this.props} /> : null
      );
    }
  }

  const mapStateToProps = (state) => ({
    isUserAuthenticated: isUserAuthenticated(state),
  });

  UserAuthenticatedComponent.propTypes = {
    isUserAuthenticated: PropTypes.bool,
  };

  return connect(mapStateToProps)(UserAuthenticatedComponent);
}
