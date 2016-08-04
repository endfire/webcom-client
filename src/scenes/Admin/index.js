import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'paintcan';
import { Link } from 'react-router';
import { LOGOUT_REQUEST } from '../../actionTypes';

const Admin = ({ children, logoutRequest }) => {
  const handleLogout = () => {
    logoutRequest();
  };

  return (
    <div>
      <Container fluid style={{ backgroundColor: 'orange' }}>
        <Row>
          <Col size={{ xs: 2 }} align={{ xs: 'center' }}>
            <Link to="/admin">Webcom</Link>
          </Col>
          <Col size={{ xs: 1 }} align={{ xs: 'center' }}>
            <Link to="/admin/brands">Brands</Link>
          </Col>
          <Col size={{ xs: 1 }} align={{ xs: 'center' }}>
            <Link to="/admin/companies">Companies</Link>
          </Col>
          <Col size={{ xs: 1 }} align={{ xs: 'center' }}>
            <Link to="/admin/obg">OBG</Link>
          </Col>
          <Col size={{ xs: 1 }} align={{ xs: 'center' }}>
            <Link to="/admin/users">Users</Link>
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
    payload: '/admin-login',
  }),
});

Admin.propTypes = {
  children: PropTypes.any,
  logoutRequest: PropTypes.func,
};

export default connect(
  null,
  mapDispatchToProps,
)(Admin);
