import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-fa';
import { Button } from 'paintcan';
import * as types from 'constants/actionTypes';
import styles from './login.scss';

const Login = ({
  path,
  children,
  loginForm,
  changeLoginForm,
  loginRequest,
  isLoginLoading,
  isLoginInvalid,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    changeLoginForm({
      key: name,
      value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLoginLoading) return;

    loginRequest({
      email: loginForm.get('email'),
      password: loginForm.get('password'),
      path,
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h3 className={styles.heading}>{children} Login</h3>
        <form className={styles.form} onSubmit={handleSubmit}>
          {isLoginInvalid && (
            <div className={styles.error}>
              Invalid email/password combination
            </div>
          )}
          <input style={{ display: 'none' }} type="text" name="fakeusernameremembered" />
          <input style={{ display: 'none' }} type="password" name="fakepasswordremembered" />
          <fieldset className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="email">
              <span>Email</span>
              <Icon name="envelope" />
            </label>
            <input
              autoFocus
              type="text"
              id="email"
              name="email"
              placeholder="john@doe.com"
              onChange={handleChange}
              value={loginForm.get('email')}
              className={styles.formInput}
            />
          </fieldset>
          <fieldset className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="password">
              <span>Password</span>
              <Icon name="lock" />
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={loginForm.get('password')}
              className={styles.formInput}
            />
          </fieldset>
          <fieldset className={styles.formGroup}>
            <Button type="submit" block loading={isLoginLoading}>
              Login
            </Button>
          </fieldset>
        </form>
        <p className={styles.heading}>
          If you need to recover your login email or password please email your request to
          &nbsp; <a href="mailto:circulation@webcomcommunications.com">
            circulation@webcomcommunications.com
          </a>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loginForm: state.login.get('form'),
  isLoginLoading: state.login.get('isLoading'),
  isLoginInvalid: state.login.get('isInvalid'),
});

const mapDispatchToProps = (dispatch) => ({
  changeLoginForm: (payload) => dispatch({
    type: types.LOGIN_FORM_CHANGE,
    payload,
  }),
  loginRequest: (payload) => dispatch({
    type: types.LOGIN_REQUEST,
    payload,
  }),
});

Login.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  loginForm: PropTypes.object,
  isLoginLoading: PropTypes.bool,
  isLoginInvalid: PropTypes.bool,
  changeLoginForm: PropTypes.func,
  loginRequest: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
