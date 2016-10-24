import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'paintcan';
import { browserHistory } from 'react-router';
import { List, AddCompanyModal } from './components/';
import { getCanUserDelete } from 'selectors/admin';
import { getCompaniesByName } from 'selectors/adminCompanies';
import { getIsDeleteLoading, getIsCreateLoading } from 'selectors/loading';
import * as actions from 'actions/store';
import styles from './styles.scss';

class CompaniesAll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      search: '',
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  handleDelete(id) {
    const { isDeleteLoading, deleteCompany, canUserDelete } = this.props;

    if (isDeleteLoading || !canUserDelete) return;

    deleteCompany(id);
  }

  handleSearchChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSearch(e) {
    e.preventDefault();

    const search = this.state.search;
    const { findCompanies } = this.props;

    findCompanies(search);
    browserHistory.push(`/admin/companies/?search=${search}`);
  }

  incrementCounter() {
    let { counter } = this.state;
    counter += 10000;
    this.setState({ counter });
  }

  render() {
    const {
      companies,
      createCompany,
      canUserDelete,
      isCreateLoading,
    } = this.props;

    const { counter } = this.state;

    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <AddCompanyModal
            createCompany={createCompany}
            isCreateLoading={isCreateLoading}
          />
        </div>
        <p>
          Note: Download counter of '0' will download the first 10,000.
          Incrementing the counter will download the next 10,000.
        </p>
        <div className={styles.download}>
          <Button onClick={this.incrementCounter} color="success">
            Increment counter: {counter}
          </Button> &nbsp;
          <a
            href={`http://webcom-server.herokuapp.com/download/people?counter=${counter}`}
            target="_blank"
            className={styles.link}
          >
            <Button onClick="" color="success">
              Download people
            </Button> &nbsp;
          </a>
          <a
            href={`https://webcom-server.herokuapp.com/download/companies?counter=${counter}`}
            target="_blank"
            className={styles.link}
          >
            <Button color="success">
              Download companies
            </Button>
          </a>
        </div>
        <div className={styles.search}>
          <form onSubmit={this.handleSearch}>
            <fieldset>
              <input
                type="text"
                id="search"
                name="search"
                onChange={this.handleSearchChange}
                value={this.state.search}
                pattern=".{3,}"
                placeholder="Please search with at least 3 characters."
                required
              />
            </fieldset>
            <fieldset>
              <Button type="submit" color="primary">
                Search
              </Button>
            </fieldset>
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
                  {this.state.search === '' ? 'Please search for a company.' : 'Loading...'}
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  companies: getCompaniesByName(ownProps.location.query.search || '')(state),
  canUserDelete: getCanUserDelete(state),
  isDeleteLoading: getIsDeleteLoading(state),
  isCreateLoading: getIsCreateLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  findCompanies: (name) => dispatch(actions.findRecords('company', { name }, {
    sideload: false,
    without: {
      listings: true,
      people: true,
    },
  })),
  deleteCompany: (id) => dispatch(actions.deleteRecord('company', 'companies', id)),
  createCompany: (data) => dispatch(actions.createRecord('company', data)),
});

CompaniesAll.propTypes = {
  companies: PropTypes.object,
  canUserDelete: PropTypes.bool,
  isDeleteLoading: PropTypes.bool,
  findCompanies: PropTypes.func,
  createCompany: PropTypes.func,
  deleteCompany: PropTypes.func,
  isCreateLoading: PropTypes.bool,
  location: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompaniesAll);
