import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getFormError } from 'selectors/form';
import { getCurrentBrand } from 'selectors/adminBrands';
import { AuthErrorCard } from 'components';
import withBrandSettings from './withBrandSettings';

const BrandSettings = ({ brand, error }) => {
  const BrandSettingsForm = withBrandSettings(brand);

  return (
    <div>
      {error && <AuthErrorCard message={error.message} />}
      <BrandSettingsForm />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  brand: getCurrentBrand(ownProps.params.brandID)(state),
  error: getFormError(state),
});

BrandSettings.propTypes = {
  brand: PropTypes.object,
  error: PropTypes.object,
};

export default connect(mapStateToProps)(BrandSettings);
