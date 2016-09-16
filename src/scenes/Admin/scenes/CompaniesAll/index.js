import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'paintcan';
import { List, AddCompanyModal } from './components/';
import { getCanUserDelete } from 'selectors/admin';
import { getCompanies } from 'selectors/adminCompanies';
import { getIsDeleteLoading, getIsCreateLoading } from 'selectors/loading';
import * as actions from 'actions/store';
import * as types from 'constants/actionTypes';
import styles from './styles.scss';

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
    const {
      companies,
      canUserDelete,
      downloadPeople,
      downloadCompanies,
      createCompany,
      isCreateLoading,
    } = this.props;

    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <AddCompanyModal
            createCompany={createCompany}
            isCreateLoading={isCreateLoading}
          /> &nbsp;
          <Button onClick={downloadPeople} color="success">Download All People</Button> &nbsp;
          <Button onClick={downloadCompanies} color="success">Download All Companies</Button>
        </div>
        <div className={styles.container}>
          {companies
            ? <List
              items={companies}
              handleDelete={this.handleDelete}
              canUserDelete={canUserDelete}
            />
            : 'Loading...'}
        </div>
      </div>
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
  createCompany: (data) => dispatch(actions.createRecord('company', data)),
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
  createCompany: PropTypes.func,
  deleteCompany: PropTypes.func,
  downloadPeople: PropTypes.func,
  downloadCompanies: PropTypes.func,
  isCreateLoading: PropTypes.bool,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompaniesAll);
