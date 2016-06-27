import React from 'react';
import classNames from 'classnames';

const Welcome = () => {
  const classes = classNames(
    'container', 'text-xs-center', 'p-a-3',
  );

  return (
    <div className={classes}>
      <h1>Welcome to the Webcom Admin dashboard.</h1>
    </div>
  );
};

export default Welcome;
