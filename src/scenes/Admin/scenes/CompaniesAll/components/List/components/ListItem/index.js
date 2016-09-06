/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react';
import { Container, Row, Col } from 'paintcan';
import { Link } from 'react-router';
import { DeleteModal } from 'scenes/components';

const ListItem = ({ item, handleDelete, canUserDelete }) => (
  <Container fluid>
    <Row>
      <Col size={{ lg: 8 }}>
        <Link to={`/admin/companies/${item.get('id')}`}>{item.get('name')}</Link>
      </Col>
      <Col size={{ lg: 2 }}>
        {!item.get('approved') &&
          <Link to={`/admin/companies/${item.get('id')}/info`}>Needs approval</Link>}
      </Col>
      <Col size={{ lg: 2 }}>
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
