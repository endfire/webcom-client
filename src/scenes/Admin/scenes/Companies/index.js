import React, { PropTypes } from 'react';
import { Container, Row, Col } from 'paintcan';
import { Link } from 'react-router';

const Companies = ({ children }) => (
  <div>
    <Container fluid style={{ backgroundColor: 'yellow' }}>
      <Row>
        <Col size={{ xs: 2 }} align={{ xs: 'center' }}>
          <Link to="/admin/companies">All companies</Link>
        </Col>
        <Col size={{ xs: 1 }} align={{ xs: 'center' }}>
          <Link to="/admin/companies/ads">All Ads</Link>
        </Col>
      </Row>
    </Container>

    {children}
  </div>
);

export default Companies;

Companies.propTypes = {
  children: PropTypes.any,
};
