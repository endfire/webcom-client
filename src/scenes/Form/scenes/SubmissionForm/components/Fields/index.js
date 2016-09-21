import React, { PropTypes } from 'react';
import mapTypeToDynamicField from './mapTypeToDynamicField';

const Fields = ({ fields, handleEditFormField, handleEditFormCheckbox }) => {
  const keys = fields.sortBy(field => field.get('priority')).keySeq();

  return (
    <div>
      {keys.map(key => {
        const field = fields.get(key);
        const type = field.get('type');

        return mapTypeToDynamicField(key, type, field, handleEditFormField, handleEditFormCheckbox);
      })}
    </div>
  );
};

Fields.propTypes = {
  fields: PropTypes.object,
  handleEditFormField: PropTypes.func,
  handleEditFormCheckbox: PropTypes.func,
};

export default Fields;
