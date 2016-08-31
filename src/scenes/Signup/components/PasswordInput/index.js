import React, { PropTypes } from 'react';
import { password } from './styles.scss';
import renderBars from './renderBars';
import renderFeedback from './renderFeedback';

const PasswordInput = ({ field, onChange }) => (
  <div className={password}>
    {renderBars(field.get('didStartTyping'), field.get('score'))}
    <input
      type="password"
      value={field.get('value')}
      placeholder="password"
      onChange={(e) => onChange(e, field)}
    />
    {renderFeedback(field.get('didStartTyping'), field.get('feedback'), field.get('score'))}
  </div>
);

PasswordInput.propTypes = {
  score: PropTypes.number,
  field: PropTypes.object,
  onChange: PropTypes.func,
};

export default PasswordInput;
