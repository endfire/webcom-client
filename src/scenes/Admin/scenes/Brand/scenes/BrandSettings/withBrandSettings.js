import React, { PropTypes } from 'react';
import { Button, ButtonGroup } from 'paintcan';
import { withForm } from 'components';
import * as names from 'constants/formNames';
import isNull from 'validator/lib/isNull';
import isHexColor from 'validator/lib/isHexColor';

const BrandSettingsForm = ({
  handleSubmit,
  handleChange,
  isSubmitting,
  revert,
  values,
}) => (
  <form onSubmit={handleSubmit}>
    <fieldset>
      <label htmlFor="name">Name of brand</label><br />
      <input
        id="name"
        type="text"
        placeholder="Antennas"
        value={values ? values.getIn(['name', 'value']) : ''}
        onChange={(e) => handleChange('name', e.target.value)}
      />
    </fieldset>
    <fieldset>
      <label htmlFor="image">Image URL</label><br />
      <input
        id="image"
        type="text"
        placeholder="http://url.com/some/path"
        value={values ? values.getIn(['image', 'value']) : ''}
        onChange={(e) => handleChange('image', e.target.value)}
      />
    </fieldset>
    <fieldset>
      <label htmlFor="background">Background color (hexadecimal)</label><br />
      <input
        id="background"
        type="text"
        placeholder="#123456"
        value={values ? values.getIn(['background', 'value']) : ''}
        onChange={(e) => handleChange('background', e.target.value)}
      />
    </fieldset>
    <fieldset>
      <label htmlFor="text">Text color (hexadecimal)</label><br />
      <input
        id="text"
        type="text"
        placeholder="#123456"
        value={values ? values.getIn(['text', 'value']) : ''}
        onChange={(e) => handleChange('text', e.target.value)}
      />
    </fieldset>
    <fieldset>
      <label htmlFor="secondary">Secondary color (hexadecimal)</label><br />
      <input
        id="secondary"
        type="text"
        placeholder="#123456"
        value={values ? values.getIn(['secondary', 'value']) : ''}
        onChange={(e) => handleChange('secondary', e.target.value)}
      />
    </fieldset>
    <fieldset>
      <ButtonGroup spaced>
        <Button type="submit" color="primary" loading={isSubmitting}>
          Submit
        </Button>
        <Button type="button" color="danger" onClick={revert}>
          Cancel
        </Button>
      </ButtonGroup>
    </fieldset>
  </form>
);

BrandSettingsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  revert: PropTypes.func.isRequired,
  values: PropTypes.object,
};

export default (brand) => withForm({
  form: names.BRAND_SETTINGS,
  recordID: brand.get('id'),
  initialValues: {
    name: brand.get('name') || '',
    image: brand.get('image') || '',
    background: brand.get('background') || '',
    text: brand.get('text') || '',
    secondary: brand.get('secondary') || '',
  },
  validation: {
    name: (value) => !isNull(value),
    image: (value) => !isNull(value),
    background: (value) => isHexColor(value),
    text: (value) => isHexColor(value),
    secondary: (value) => isHexColor(value),
  },
})(BrandSettingsForm);
