import React, { PropTypes } from 'react';
import { Container, Row, Col } from 'paintcan';
import { Link } from 'react-router';

const Admin = ({ children }) => (
  <div>
    <Container fluid style={{ backgroundColor: 'orange' }}>
      <Row>
        <Col size={{ xs: 2 }} align={{ xs: 'center' }}><Link to="/admin">Webcom</Link></Col>
        <Col size={{ xs: 1 }} align={{ xs: 'center' }}><Link to="/admin/brands">Brands</Link></Col>
        <Col size={{ xs: 1 }} align={{ xs: 'center' }}>
          <Link to="/admin/companies">Companies</Link>
        </Col>
        <Col size={{ xs: 1 }} align={{ xs: 'center' }}><Link to="/admin/obg">OBG</Link></Col>
        <Col size={{ xs: 1 }} align={{ xs: 'center' }}><Link to="/admin/users">Users</Link></Col>
        <Col size={{ xs: 6 }} align={{ xs: 'center' }}><Link to="/admin-login">Logout</Link></Col>
      </Row>
    </Container>

    {children}
  </div>
);

export default Admin;

Admin.propTypes = {
  children: PropTypes.any,
};
