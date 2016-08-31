import React, { PropTypes } from 'react';
import { Icon } from 'react-fa';
import { input, good, bad } from './styles.scss';

const renderFeedback = (didStartTyping, isValid) => {
  if (!didStartTyping) return null;

  const iconName = isValid ? 'check' : 'times';
  const iconClassName = isValid ? good : bad;

  return <Icon name={iconName} className={iconClassName} />;
};

const ValidatedInput = ({ type, placeholder, field, autoFocus, onChange }) => (
  <div className={input}>
    <input
      type={type}
      value={field.get('value')}
      placeholder={placeholder}
      onChange={(e) => onChange(e, field)}
      autoFocus={autoFocus}
    />
    {renderFeedback(field.get('didStartTyping'), field.get('isValid'))}
  </div>
);

ValidatedInput.propTypes = {
  field: PropTypes.object.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func,
};

ValidatedInput.defaultProps = {
  placeholder: '',
  type: 'text',
  isValid: false,
  autoFocus: false,
  didStartTyping: false,
};

export default ValidatedInput;
