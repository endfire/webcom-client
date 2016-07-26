/* eslint-disable react/jsx-no-bind */
import React, { PropTypes, cloneElement } from 'react';
import { Container, Row, Col, Button } from 'paintcan';

const ListItem = ({ item, handleDelete, children }) => (
  <Container fluid>
    <Row>
      <Col size={{ lg: 6 }}>
        {cloneElement(children, { item })}
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
  children: PropTypes.any,
};

export default ListItem;
