import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'paintcan';
import { Link } from 'react-router';
import { LOGOUT_REQUEST } from '../../actionTypes';

const Company = ({ children, logoutRequest }) => {
  const handleLogout = () => {
    logoutRequest();
  };

  return (
    <div>
      <Container fluid style={{ backgroundColor: 'yellow' }}>
        <Row>
          <Col size={{ xs: 2 }} align={{ xs: 'center' }}>
            <Link to="/company">Webcom</Link>
          </Col>
          <Col size={{ xs: 1 }} align={{ xs: 'center' }}>
            <Link to="/company/listings">Listings</Link>
          </Col>
          <Col size={{ xs: 1 }} align={{ xs: 'center' }}>
            <Link to="/company/people">People</Link>
          </Col>
          <Col size={{ xs: 1 }} align={{ xs: 'center' }}>
            <Link to="/company/settings">Settings</Link>
          </Col>
          <Col size={{ xs: 6 }} align={{ xs: 'center' }}>
            <Button onClick={handleLogout}>Logout</Button>
          </Col>
        </Row>
      </Container>

      {children}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  logoutRequest: () => dispatch({
    type: LOGOUT_REQUEST,
    payload: '/company-login',
  }),
});

Company.propTypes = {
  children: PropTypes.any,
  logoutRequest: PropTypes.func,
};

export default connect(
  null,
  mapDispatchToProps,
)(Company);
