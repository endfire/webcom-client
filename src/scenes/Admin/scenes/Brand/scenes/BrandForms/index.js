import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'paintcan';
import { AddFormModal, List } from './components';
import { getCurrentBrandForms } from 'selectors/admin-brand-forms';
import * as types from 'constants/actionTypes';

class BrandForms extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const { findForms, params: { brandID } } = this.props;

    findForms(brandID);
  }

  handleDelete(id) {
    const { isDeleteLoading, deleteForm } = this.props;

    if (isDeleteLoading) return;

    deleteForm(id);
  }

  render() {
    const { forms, createForm, isCreateLoading, params: { brandID } } = this.props;

    return (
      <Container fluid><br />
        <Row>
          <Col align={{ xs: 'start' }}>
            <AddFormModal
              createForm={createForm}
              isCreateLoading={isCreateLoading}
            /><br /><br /><br />
          {forms
            ? <List
              items={forms}
              brandID={brandID}
              handleDelete={this.handleDelete}
            />
            : 'Loading...'}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  forms: getCurrentBrandForms(ownProps.params.brandID)(state),
  isDeleteLoading: state.store.getIn(['isLoading', 'DELETE']),
  isCreateLoading: state.store.getIn(['isLoading', 'CREATE']),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  findForms: (brand) => dispatch({
    type: types.FIND_REQUEST,
    payload: {
      type: 'form',
      filters: {
        brand,
      },
    },
  }),
  deleteForm: (id) => dispatch({
    type: types.DELETE_REQUEST,
    payload: {
      type: 'form',
      id,
    },
  }),
  createForm: (name) => dispatch({
    type: types.CREATE_REQUEST,
    payload: {
      type: 'form',
      record: {
        name,
        brand: ownProps.params.brandID,
        // template
      },
    },
  }),
});

BrandForms.propTypes = {
  params: PropTypes.object,
  forms: PropTypes.object,
  isDeleteLoading: PropTypes.bool,
  isCreateLoading: PropTypes.bool,
  findForms: PropTypes.func,
  deleteForm: PropTypes.func,
  createForm: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BrandForms);
