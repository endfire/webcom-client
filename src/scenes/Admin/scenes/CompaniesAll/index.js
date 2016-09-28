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

    this.state = {
      clickedCompany: false,
      clickedPeople: false,
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.clickPeople = this.clickPeople.bind(this);
    this.clickCompany = this.clickCompany.bind(this);
  }

  componentDidMount() {
    this.props.findCompanies(false, 'Energy');
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps);
    console.log('Did update');
  }

  handleDelete(id) {
    const { isDeleteLoading, deleteCompany, canUserDelete } = this.props;

    if (isDeleteLoading || !canUserDelete) return;

    deleteCompany(id);
  }

  clickPeople() {
    this.setState({ clickedPeople: true });
    this.props.downloadPeople();
  }

  clickCompany() {
    this.setState({ clickedCompany: true });
    this.props.downloadCompanies();
  }

  render() {
    const {
      companies,
      canUserDelete,
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
          <Button onClick={this.clickPeople} color="success" disabled>
            Download All People
          </Button> &nbsp;
          <Button onClick={this.clickCompany} color="success" disabled>
            Download All Companies
          </Button>
        </div>
        <div className={styles.search}>
          <form>

          </form>
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
  findCompanies: (sideload, name) => dispatch(actions.findRecords('company', { name }, sideload)),
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
