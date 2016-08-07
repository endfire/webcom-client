import React, { PropTypes } from 'react';

const DynamicTextField = (props) => {
  const { label, onChange, somePieceOfState } = props;
  // TODO: modify somePieceOfState

  return (
    <fieldset>
      <label htmFor={label}>{label}</label>
      <input
        type="text"
        id={label}
        name={label}
        onChange={onChange}
        value={somePieceOfState.get(label)}
      />
    </fieldset>
  );
};

DynamicTextField.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  somePieceOfState: PropTypes.object,
};

export default DynamicTextField;
