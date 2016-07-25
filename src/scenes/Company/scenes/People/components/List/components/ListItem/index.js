/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react';
import EditPersonModal from './components/EditPersonModal';
import { Container, Row, Col, Button } from 'paintcan';

const ListItem = ({ person, deleteHandler }) => (
  <Container fluid>
    <Row>
      <Col size={{ lg: 6 }}>
        <EditPersonModal person={person} />
      </Col>
      <Col size={{ lg: 6 }}>
        <Button onClick={deleteHandler.bind(this, person.id)}>Delete</Button>
      </Col>
    </Row>
  </Container>
);

ListItem.propTypes = {
  person: PropTypes.object,
  deleteHandler: PropTypes.func,
};

export default ListItem;