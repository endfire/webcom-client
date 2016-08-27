import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'paintcan';
import { AddBrandModal, List } from './components';
import * as types from 'constants/actionTypes';

class Brands extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.findBrands();
  }

  handleDelete(id) {
    const { isDeleteLoading, deleteBrand } = this.props;

    if (isDeleteLoading) return;

    deleteBrand(id);
  }

  render() {
    const { brands, createBrand, isCreateLoading } = this.props;

    return (
      <Container fluid><br />
        <Row>
          <Col size={{ xs: 4 }} align={{ xs: 'start' }}>
            <AddBrandModal
              createBrand={createBrand}
              isCreateLoading={isCreateLoading}
            /><br /><br /><br />
          {brands
            ? <List
              items={brands}
              handleDelete={this.handleDelete}
            />
            : 'Loading...'}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  brands: state.store.getIn(['entities', 'brands']),
  isDeleteLoading: state.store.getIn(['isLoading', 'DELETE']),
  isCreateLoading: state.store.getIn(['isLoading', 'CREATE']),
});

const mapDispatchToProps = (dispatch) => ({
  findBrands: () => dispatch({
    type: types.FIND_REQUEST,
    payload: {
      type: 'brand',
    },
  }),
  deleteBrand: (id) => dispatch({
    type: types.DELETE_REQUEST,
    payload: {
      type: 'brand',
      id,
    },
  }),
  createBrand: (name) => dispatch({
    type: types.CREATE_REQUEST,
    payload: {
      type: 'brand',
      record: {
        name,
        // image
      },
    },
  }),
});

Brands.propTypes = {
  brands: PropTypes.object,
  isDeleteLoading: PropTypes.bool,
  isCreateLoading: PropTypes.bool,
  findBrands: PropTypes.func,
  deleteBrand: PropTypes.func,
  createBrand: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Brands);
