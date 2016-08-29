import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { v4 } from 'node-uuid';

import {
  initializeForm,
  revertForm,
  changeForm,
  submitFormRequest,
} from 'actions/form';

export default ({
  form = v4(),
  initialValues = {},
  validation = {},
  recordID = '',
}) => (WrappedComponent) => {
  class Form extends Component {
    static propTypes = {
      initialize: PropTypes.func,
    }

    componentWillMount() {
      this.props.initialize();
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  }

  const mapStateToProps = (state) => ({
    values: state.form.getIn([form, 'current']),
    isValidating: state.form.getIn([form, 'isValidating']),
    isDirty: state.form.getIn([form, 'isDirty']),
    isSubmitting: state.form.getIn([form, 'isSubmitting']),
  });

  const mapDispatchToProps = (dispatch, ownProps) => ({
    initialize: () => dispatch(initializeForm(form, initialValues, validation, recordID)),
    revert: () => dispatch(revertForm(form)),
    handleChange: (name, value) => dispatch(changeForm(form, name, value, validation)),

    handleSubmit: (e) => {
      e.preventDefault();

      if (ownProps.isSubmitting) return null;

      return dispatch(submitFormRequest(form));
    },
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Form);
};
