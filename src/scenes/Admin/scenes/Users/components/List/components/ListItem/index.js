/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react';
import { Container, Row, Col, Button } from 'paintcan';

const ListItem = ({ item, handleDelete }) => (
  <Container fluid>
    <Row>
      <Col size={{ xs: 2 }} align={{ xs: 'start' }}>
        {item.get('name')}
      </Col>
      <Col size={{ xs: 2 }} align={{ xs: 'start' }}>
        Role: {item.get('role')}
      </Col>
      <Col size={{ xs: 4 }} align={{ xs: 'end' }}>
        Email: {item.get('email')}
      </Col>
      <Col size={{ xs: 4 }} align={{ xs: 'end' }}>
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
