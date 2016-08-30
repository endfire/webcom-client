/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react';
import { Container, Row, Col } from 'paintcan';
import { DeleteModal } from 'scenes/components';

const ListItem = ({ item, handleDelete, canUserDelete }) => (
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
        {canUserDelete && <DeleteModal handleDelete={handleDelete.bind(this, item.get('id'))} />}
      </Col>
    </Row>
  </Container>
);

ListItem.propTypes = {
  item: PropTypes.object,
  handleDelete: PropTypes.func,
  canUserDelete: PropTypes.bool,
};

export default ListItem;
