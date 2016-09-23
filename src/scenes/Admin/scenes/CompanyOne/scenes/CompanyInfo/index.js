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
      {
        !company.get('approved')
          ? <p>
            <strong>Old Name:</strong> {company.get('oldName')} <br />
            <strong>Old Street:</strong> {company.get('oldStreet')} <br />
            <strong>Old Street2:</strong> {company.get('oldStreetTwo')} <br />
            <strong>Old City:</strong> {company.get('oldCity')} <br />
            <strong>Old State:</strong> {company.get('oldState')} <br />
            <strong>Old Zip:</strong> {company.get('oldZip')} <br />
            <strong>Old Country:</strong> {company.get('oldCountry')} <br />
            <strong>Old Phone:</strong> {company.get('oldPhone')} <br />
            <strong>Old Fax:</strong> {company.get('oldFax')} <br />
            <strong>Old Url:</strong> {company.get('oldUrl')} <br />
            <strong>Old Email:</strong> {company.get('oldEmail')} <br />
            <strong>Old Description:</strong> {company.get('oldDescription')} <br />
          </p>
          : ''
      }
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
