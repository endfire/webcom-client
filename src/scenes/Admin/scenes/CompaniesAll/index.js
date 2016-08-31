import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'paintcan';
import List from './components/List';
import { getCanUserDelete } from 'selectors/admin';
import { getCompanies } from 'selectors/adminCompanies';
import { getIsDeleteLoading, getIsCreateLoading } from 'selectors/loading';
import * as actions from 'actions/store';
import * as types from 'constants/actionTypes';

class CompaniesAll extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.findCompanies();
  }

  handleDelete(id) {
    const { isDeleteLoading, deleteCompany, canUserDelete } = this.props;

    if (isDeleteLoading || !canUserDelete) return;

    deleteCompany(id);
  }

  render() {
    const { companies, canUserDelete, downloadPeople, downloadCompanies } = this.props;

    return (
      <Container fluid><br />
        <Row>
          <Col>
            <Button onClick={downloadPeople}>Download All People</Button>
            <Button onClick={downloadCompanies}>Download All Companies</Button>
          </Col>
        </Row><br />
        <Row>
          <Col align={{ xs: 'start' }}>
          {companies
            ? <List
              items={companies}
              handleDelete={this.handleDelete}
              canUserDelete={canUserDelete}
            />
            : 'Loading...'}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  companies: getCompanies(state),
  canUserDelete: getCanUserDelete(state),
  isDeleteLoading: getIsDeleteLoading(state),
  isCreateLoading: getIsCreateLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  findCompanies: () => dispatch(actions.findRecords('company')),
  deleteCompany: (id) => dispatch(actions.deleteRecord('company', 'companies', id)),
  downloadPeople: () => dispatch({
    type: types.DOWNLOAD,
    payload: {
      type: 'people',
    },
  }),
  downloadCompanies: () => dispatch({
    type: types.DOWNLOAD,
    payload: {
      type: 'companies',
    },
  }),
});

CompaniesAll.propTypes = {
  companies: PropTypes.object,
  canUserDelete: PropTypes.bool,
  isDeleteLoading: PropTypes.bool,
  findCompanies: PropTypes.func,
  deleteCompany: PropTypes.func,
  downloadPeople: PropTypes.func,
  downloadCompanies: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompaniesAll);
