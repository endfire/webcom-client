import React from 'react';
import {
  DynamicCheckboxField,
  DynamicSelectField,
  DynamicTextareaField,
  DynamicTextField,
} from 'scenes/Form/components';

export default (key, type, field, handleEditFormField, handleEditFormCheckbox) => {
  switch (type) {
    case 'text':
      return <DynamicTextField key={key} field={field} onChange={handleEditFormField} />;
    case 'textarea':
      return <DynamicTextareaField key={key} field={field} onChange={handleEditFormField} />;
    case 'select':
      return <DynamicSelectField key={key} field={field} onChange={handleEditFormField} />;
    case 'checkbox':
      return <DynamicCheckboxField key={key} field={field} onChange={handleEditFormCheckbox} />;
    default:
      return null;
  }
};
