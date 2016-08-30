import React, { PropTypes } from 'react';
import { card } from './styles.scss';

const AuthErrorCard = ({ message }) => (
  <div className={card}>
    {message}
  </div>
);

AuthErrorCard.propTypes = {
  message: PropTypes.string,
};

AuthErrorCard.defaultProps = {
  message: 'There was an error.',
};

export default AuthErrorCard;
