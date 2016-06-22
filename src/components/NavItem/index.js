import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import classNames from 'classnames';

class NavItem extends Component {
  constructor(props) {
    super();

    const { router, to } = props;

    this.push = this.push.bind(this);
    this.state = { active: router.isActive(to) };
  }

  push() {
    const { router, to } = this.props;
    router.push(to);
    this.setState({ active: router.isActive(to) });
  }

  render() {
    const { children } = this.props;
    const { active } = this.state;
    const classes = classNames('nav-item', { active });

    return (
      <li className={classes} onClick={this.push}>
        <a className="nav-link" href="#">{children}</a>
      </li>
    );
  }
}

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  router: PropTypes.object,
  children: PropTypes.any,
};

NavItem.defaultProps = {
  active: false,
};

export default withRouter(NavItem);
