/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react';
import { Container, Row, Col, Button } from 'paintcan';
import { Link } from 'react-router';

const ListItem = ({ item, handleDelete }) => (
  <Container fluid>
    <Row>
      <Col size={{ lg: 6 }}>
        <Link to={`/admin/brands/${item.get('id')}`}>{item.get('name')}</Link>
      </Col>
      <Col size={{ lg: 6 }}>
        <Button onClick={handleDelete.bind(this, item.get('id'))}>Delete</Button>
      </Col>
    </Row>
  </Container>
);

ListItem.propTypes = {
  item: PropTypes.object,
  handleDelete: PropTypes.func,
};

export default ListItem;
