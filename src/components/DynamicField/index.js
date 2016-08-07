import React, { PropTypes } from 'react';
import mapFieldTypeToInput from './utils/mapFieldTypeToInput';

const DynamicField = ({ label, placeholder, type }) => { // TODO: index
  const props = { label, placeholder, type };

  const Component = mapFieldTypeToInput(type);

  return <Component {...props} />;
};

DynamicField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  index: PropTypes.string,
};

export default DynamicField;


// TODO: need some sort of onChange handler to update the redux state
/*
  const onChange = (e) => {
    const { name, value } = e.target;

    someAction({
      key: name,
      value,
    });
  };
*/
