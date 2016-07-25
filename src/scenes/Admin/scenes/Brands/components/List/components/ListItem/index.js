/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Container, Row, Col, Button } from 'paintcan';

const ListItem = ({ item, handleDelete }) => (
  <Container fluid>
    <Row>
      <Col size={{ lg: 6 }}>
        <Link to={`/admin/brands/brand/${item.id}`}>{item.name}</Link>
      </Col>
      <Col size={{ lg: 6 }}>
        <Button onClick={handleDelete.bind(this, item.id)}>Delete</Button>
      </Col>
    </Row>
  </Container>
);

ListItem.propTypes = {
  item: PropTypes.object,
  handleDelete: PropTypes.func,
};

export default ListItem;
