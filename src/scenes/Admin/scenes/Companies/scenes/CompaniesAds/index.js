import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'paintcan';
import List from './components/List';
import AddCompanyModal from './components/AddCompanyModal';
import { FIND_REQUEST, DELETE_REQUEST } from '../../../../../../actionTypes';

class CompaniesAll extends Component {
  constructor(props) {
    super(props);

    this.find = this.find.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.find();
  }

  find() {
    const { findCompanies } = this.props;
    findCompanies();
  }

  handleDelete(id) {
      // const { isDeleteLoading, deleteCompany } = this.props;
    const { isDeleteLoading } = this.props;

    if (isDeleteLoading) return;

    console.log(`Delete company ${id}`);
    // FIXME: need to fix saga...
    // deleteCompany(id); // dispatch action
  }

  render() {
    const { companies } = this.props;

    return (
      <Container fluid><br />
        <Row>
          <Col size={{ xs: 4 }} align={{ xs: 'left' }}>
            <AddCompanyModal /><br /><br /><br />
            {companies ? <List items={companies} handleDelete={this.handleDelete} /> : 'Loading...'}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  companies: state.store.entities.companies,
  isDeleteLoading: state.store.isLoading.DELETE,
});

const mapDispatchToProps = (dispatch) => ({
  findCompanies: () => dispatch({
    type: FIND_REQUEST,
    payload: {
      type: 'company',
    },
  }),
  deleteCompany: (id) => dispatch({
    type: DELETE_REQUEST,
    payload: {
      type: 'company',
      id,
    },
  }),
});

Companies.propTypes = {
  companies: PropTypes.object,
  findCompanies: PropTypes.func,
  isDeleteLoading: PropTypes.bool,
  deleteCompany: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Companies);
