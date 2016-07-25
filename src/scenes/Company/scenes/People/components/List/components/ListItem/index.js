/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react';
import EditPersonModal from './components/EditPersonModal';
import { Container, Row, Col, Button } from 'paintcan';

const ListItem = ({ item, handleDelete }) => (
  <Container fluid>
    <Row>
      <Col size={{ lg: 6 }}>
        <EditPersonModal person={item} />
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
