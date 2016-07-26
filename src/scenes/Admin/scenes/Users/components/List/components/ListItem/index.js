/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react';
import EditUserModal from './components/EditUserModal';
import { Container, Row, Col, Button } from 'paintcan';

const ListItem = ({ item, handleDelete }) => (
  <Container fluid>
    <Row>
      <Col size={{ lg: 12 }}>
        <EditUserModal user={item} />
        <span className="m-l-2">Role: {item.role}</span>
        <span className="m-l-2">Email: {item.email}</span>
      </Col>
      <Col size={{ lg: 12 }}>
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
