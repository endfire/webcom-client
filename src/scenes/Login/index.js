import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Container, Row, Col, Button } from 'paintcan';

const Login = ({ link, children }) => (
  <Container fluid>
    <Row align={{ xs: 'center' }}><h3>{children} Login</h3></Row>
    <Row align={{ xs: 'center' }}>
      <Col size={{ xs: 4 }}>
        <form>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" /><br />
          <label htmlFor="password">Password</label>
          <input type="text" id="password" /><br />
        </form>
      </Col>
    </Row>
    <Row align={{ xs: 'center' }}><Button><Link to={link}>Login</Link></Button></Row>
  </Container>
);

export default Login;

Login.propTypes = {
  children: PropTypes.any.isRequired,
  link: PropTypes.string.isRequired,
};
