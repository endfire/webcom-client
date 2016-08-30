import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getIsCompanyAuthenticated } from '../selectors/auth';

export default function requiresAuth(WrappedComponent) {
  class CompanyAuthenticatedComponent extends Component {
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
      if (!this.props.isCompanyAuthenticated) browserHistory.push('/company-login');
    }

    render() {
      return (
        this.props.isCompanyAuthenticated ? <WrappedComponent {...this.props} /> : null
      );
    }
  }

  const mapStateToProps = (state) => ({
    isCompanyAuthenticated: getIsCompanyAuthenticated(state),
  });

  CompanyAuthenticatedComponent.propTypes = {
    isCompanyAuthenticated: PropTypes.bool,
  };

  return connect(mapStateToProps)(CompanyAuthenticatedComponent);
}
