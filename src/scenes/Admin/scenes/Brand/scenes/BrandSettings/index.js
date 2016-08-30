import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getFormError } from 'selectors/form';
import { getCurrentBrand } from 'selectors/admin';
import { AuthErrorCard } from 'components';
import withBrandSettings from './withBrandSettings';
import styles from './settings.scss';

const BrandSettings = ({ brand, error }) => {
  const BrandSettingsForm = withBrandSettings(brand);

  return (
    <div className={styles.wrapper}>
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
