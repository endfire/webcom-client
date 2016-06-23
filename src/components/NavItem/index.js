import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import classNames from 'classnames';

const NavItem = ({ to, router, children }) => {
  const active = router.isActive(to);
  const classes = classNames('nav-item', { active });

  return (
    <li className={classes} onClick={() => router.replace(to)}>
      <a className="nav-link" href="#">{children}</a>
    </li>
  );
};

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  router: PropTypes.object,
  children: PropTypes.any,
};

NavItem.defaultProps = {
  active: false,
};

export default withRouter(NavItem);
