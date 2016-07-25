import React, { PropTypes } from 'react';
import { Container, Row, Col } from 'paintcan';
import { Link } from 'react-router';

const Company = ({ children }) => (
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
          <Link to="/company-login">Logout</Link>
        </Col>
      </Row>
    </Container>

    {children}
  </div>
);

export default Company;

Company.propTypes = {
  children: PropTypes.any,
};
