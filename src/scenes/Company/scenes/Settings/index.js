import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getFormError } from 'selectors/form';
import { getLoggedInCompany } from 'selectors/company';
import { AuthErrorCard } from 'components';
import withCompanySettings from './withCompanySettings';

const CompanySettings = ({ company, error }) => {
  const CompanySettingsForm = withCompanySettings(company);

  return (
    <div>
      {error && <AuthErrorCard message={error.message} />}
      <CompanySettingsForm />
    </div>
  );
};

const mapStateToProps = (state) => ({
  company: getLoggedInCompany(state),
  error: getFormError(state),
});

CompanySettings.propTypes = {
  company: PropTypes.object,
  error: PropTypes.object,
};

export default connect(mapStateToProps)(CompanySettings);
