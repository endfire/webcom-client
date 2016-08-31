import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button, Col, Container, Row } from 'paintcan';

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
      <Container fluid full className={styles.wrapper}>
        <Row>
          <Col
            size={{ xs: 12, sm: 8, md: 6, lg: 4 }}
            offset={{ sm: 2, md: 3, lg: 4 }}
            className={styles.signup}
          >
            <form onSubmit={handleSubmit}>
              <Link className={styles.brand} to="http://webcomcommunications.com">Webcom</Link>
              <p className={styles.marketing}>
                Signing up to submit a free listing.
              </p>
              {error && <AuthErrorCard message={error.message} />}
              <fieldset>
                <label>Full name</label>
                <ValidatedInput
                  field={name}
                  placeholder="John Doe"
                  onChange={onChange}
                  autoFocus
                />
              </fieldset>
              <fieldset>
                <label>Email address</label>
                <ValidatedInput
                  field={email}
                  placeholder="john@doe.com"
                  onChange={onChange}
                />
              </fieldset>
              <fieldset>
                <label>Password</label>
                <PasswordInput
                  field={password}
                  onChange={onChange}
                />
              </fieldset>
              <fieldset>
                <label>Confirm password</label>
                <ValidatedInput
                  field={confirm}
                  type="password"
                  placeholder="password"
                  onChange={onChange}
                />
              </fieldset>
              <fieldset>
                <Button type="submit" color="danger" loading={isLoading} block>
                  Sign up
                </Button>
              </fieldset>
              <Link to="/company-login" className="pull-xs-left">
                Already have an account?
              </Link>
            </form>
          </Col>
        </Row>
      </Container>
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
