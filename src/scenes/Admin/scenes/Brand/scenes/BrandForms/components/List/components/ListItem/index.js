/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react';
import { Container, Row, Col } from 'paintcan';
import { Link } from 'react-router';
import { DeleteModal } from 'scenes/components';

const ListItem = ({ item, brandID, handleDelete, canUserDelete }) => (
  <Container fluid>
    <Row>
      <Col size={{ lg: 6 }}>
        <Link to={`/admin/brands/${brandID}/forms/${item.get('id')}`}>{item.get('name')}</Link>
      </Col>
      <Col size={{ lg: 6 }}>
        {canUserDelete && <DeleteModal handleDelete={handleDelete.bind(this, item.get('id'))} />}
      </Col>
    </Row>
  </Container>
);

ListItem.propTypes = {
  item: PropTypes.object,
  brandID: PropTypes.string,
  handleDelete: PropTypes.func,
  canUserDelete: PropTypes.bool,
};

export default ListItem;
