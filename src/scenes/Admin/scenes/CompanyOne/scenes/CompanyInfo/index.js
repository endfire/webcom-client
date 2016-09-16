import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'paintcan';
import { getFormError } from 'selectors/form';
import { getCurrentCompany } from 'selectors/adminCompanies';
import { AuthErrorCard } from 'components';
import * as actions from 'actions/store';
import withCompanyInfo from './withCompanyInfo';
import styles from './settings.scss';

const CompanyInfo = ({ company, error, approveCompany }) => {
  const CompanyInfoForm = withCompanyInfo(company);

  return (
    <div className={styles.wrapper}>
      {
        !company.get('approved') &&
          <Button onClick={approveCompany} color="primary">Approve this company</Button>
      }
      <h3>Information</h3>
      {error && <AuthErrorCard message={error.message} />}
      <CompanyInfoForm />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  company: getCurrentCompany(ownProps.params.companyID)(state),
  error: getFormError(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  approveCompany: () => dispatch(actions.updateRecord('company', ownProps.params.companyID, {
    approved: true,
  })),
});

CompanyInfo.propTypes = {
  company: PropTypes.object,
  error: PropTypes.object,
  approveCompany: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompanyInfo);
