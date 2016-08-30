/* eslint-disable react/jsx-no-bind */
import React, { PropTypes, cloneElement } from 'react';
import { Container, Row, Col } from 'paintcan';
import { DeleteModal } from 'scenes/components';

const ListItem = ({ item, handleDelete, children }) => (
  <Container fluid>
    <Row>
      <Col size={{ lg: 6 }}>
        {cloneElement(children, { item })}
      </Col>
      <Col size={{ lg: 6 }}>
        <DeleteModal handleDelete={handleDelete.bind(this, item.get('id'))} />
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
