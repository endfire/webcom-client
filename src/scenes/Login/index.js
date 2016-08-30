import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'paintcan';
import * as types from 'constants/actionTypes';

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
    <Container fluid>
      <Row align={{ xs: 'center' }}><h3>{children} Login</h3></Row>
      <form onSubmit={handleSubmit}>
        <Row align={{ xs: 'center' }}>
          <Col size={{ xs: 4 }}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={handleChange}
              value={loginForm.get('email')}
            /><br />
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              name="password"
              onChange={handleChange}
              value={loginForm.get('password')}
            /><br />
          </Col>
        </Row>
        <Row align={{ xs: 'center' }}>
          <Col size={{ xs: 4 }}>
            <Button type="submit">Login</Button>
          </Col>
        </Row>
      </form><br />
      {isLoginInvalid
        ? <Row align={{ xs: 'center' }}><div>Invalid email/password combination</div></Row>
        : null}
    </Container>
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
