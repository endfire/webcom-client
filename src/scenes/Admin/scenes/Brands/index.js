import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'paintcan';
import List from './components/List';
import AddBrandModal from './components/AddBrandModal';
import { FIND_REQUEST, DELETE_REQUEST } from '../../../../actionTypes';

class Brands extends Component {
  constructor(props) {
    super(props);

    this.find = this.find.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.find();
  }

  find() {
    const { findBrands } = this.props;
    findBrands();
  }

  handleDelete(id) {
      // const { isDeleteLoading, deleteBrand } = this.props;
    const { isDeleteLoading } = this.props;

    if (isDeleteLoading) return;

    console.log(`Delete brand ${id}`);
    // FIXME: need to fix saga...
    // deleteBrand(id); // dispatch action
  }

  render() {
    const { brands } = this.props;

    return (
      <Container fluid><br />
        <Row>
          <Col size={{ xs: 4 }} align={{ xs: 'left' }}>
            <AddBrandModal /><br /><br /><br />
            {brands ? <List items={brands} handleDelete={this.handleDelete} /> : 'Loading...'}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  brands: state.store.entities.brands,
  isDeleteLoading: state.store.isLoading.DELETE,
});

const mapDispatchToProps = (dispatch) => ({
  findBrands: () => dispatch({
    type: FIND_REQUEST,
    payload: {
      type: 'brand',
    },
  }),
  deleteBrand: (id) => dispatch({
    type: DELETE_REQUEST,
    payload: {
      type: 'brand',
      id,
    },
  }),
});

Brands.propTypes = {
  brands: PropTypes.object,
  findBrands: PropTypes.func,
  isDeleteLoading: PropTypes.bool,
  deleteBrand: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Brands);
