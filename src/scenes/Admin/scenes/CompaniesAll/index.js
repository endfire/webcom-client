import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'paintcan';
import { browserHistory } from 'react-router';
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
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    this.props.findCompanies(
      this.props.location.query.skip,
      this.props.location.query.limit
    );
  }

  componentDidUpdate(prevProps) {
    if (
      (prevProps.location.query.skip !== this.props.location.query.skip) ||
      (prevProps.location.query.limit !== this.props.location.query.limit)
    ) {
      this.props.findCompanies(
        this.props.location.query.skip,
        this.props.location.query.limit
      );
    }
  }

  handleDelete(id) {
    const { isDeleteLoading, deleteCompany, canUserDelete } = this.props;

    if (isDeleteLoading || !canUserDelete) return;

    deleteCompany(id);
  }

  loadMore() {
    const skip = Number(this.props.location.query.skip) || 0;
    const limit = Number(this.props.location.query.limit) || 80;
    const next = skip + limit;

    browserHistory.push(`/admin/companies?limit=${limit}&skip=${next}`);
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
          {!companies.isEmpty()
            ? <List
              items={companies.sortBy(company => company.get('name'))}
              handleDelete={this.handleDelete}
              canUserDelete={canUserDelete}
            />
            : <div className={styles.wrapperLoading}>
              <div>
                  Loading...
              </div>
            </div>
          }
        </div>
        <div className={styles.bottom}>
          <Button onClick={this.loadMore}>Load More</Button>
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
  findCompanies: (skip, limit) => dispatch(actions.findRecords('company', {}, {
    limit,
    skip,
  })),
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
  location: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompaniesAll);
