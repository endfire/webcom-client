import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'paintcan';

import { PasswordInput, ValidatedInput } from './components';
import { AuthErrorCard } from 'components';
import styles from './signup.scss';
import { getLastSignupError } from 'selectors/auth';
import * as types from 'constants/actionTypes';

class Signup extends Component {
  static propTypes = {
    name: PropTypes.object,
    email: PropTypes.object,
    password: PropTypes.object,
    confirm: PropTypes.object,
    error: PropTypes.object,
    isLoading: PropTypes.bool,
    onChange: PropTypes.func,
    requestSignup: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const {
      requestSignup,
      name,
      email,
      password,
      confirm,
      isLoading,
    } = this.props;

    e.preventDefault();

    if (isLoading) return;

    // TODO: isEveryFieldValid
    requestSignup(
      name.get('value'),
      email.get('value'),
      password.get('value'),
      confirm.get('value'),
    );
  }

  render() {
    const { name, email, password, confirm, isLoading, onChange, error } = this.props;
    const { handleSubmit } = this;

    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Link className={styles.brand} to="http://webcomcommunications.com">Webcom</Link>
          <h3 className={styles.heading}>Signup to submit a free listing</h3>
          <form className={styles.form} onSubmit={handleSubmit}>
            {error && <AuthErrorCard message={error.message} />}
            <fieldset className={styles.formGroup}>
              <label className={styles.formLabel}>Company name</label>
              <ValidatedInput
                field={name}
                placeholder="Apple"
                onChange={onChange}
                autoFocus
              />
            </fieldset>
            <fieldset className={styles.formGroup}>
              <label className={styles.formLabel}>Email address</label>
              <ValidatedInput
                field={email}
                placeholder="john@apple.com"
                onChange={onChange}
              />
            </fieldset>
            <fieldset className={styles.formGroup}>
              <label className={styles.formLabel}>Password</label>
              <PasswordInput
                field={password}
                onChange={onChange}
              />
            </fieldset>
            <fieldset className={styles.formGroup}>
              <label className={styles.formLabel}>Confirm password</label>
              <ValidatedInput
                field={confirm}
                type="password"
                placeholder="••••••••"
                onChange={onChange}
              />
            </fieldset>
            <fieldset className={styles.formGroup}>
              <Button type="submit" loading={isLoading} block>
                Sign up
              </Button>
            </fieldset>
            <Link to="/company-login" className="pull-xs-left" className={styles.exists}>
              Already have an account?
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.signup.getIn(['form', 'name']),
  email: state.signup.getIn(['form', 'email']),
  password: state.signup.getIn(['form', 'password']),
  confirm: state.signup.getIn(['form', 'confirm']),
  isLoading: state.signup.get('isLoading'),
  error: getLastSignupError(state),
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (e, field) => dispatch({
    type: types.SIGNUP_FORM_CHANGE,
    payload: {
      value: e.target.value,
      field,
    },
  }),
  requestSignup: (name, email, password, confirm) => dispatch({
    type: types.SIGNUP_REQUEST,
    payload: {
      name, email, password, confirm,
    },
  }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);
