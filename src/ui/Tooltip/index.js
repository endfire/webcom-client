import React, { PropTypes } from 'react';
import { Tooltip } from 'reactstrap';
import { v1 } from 'node-uuid';

class UITooltip extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = { isOpen: false, id: v1() };
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { placement, target, children } = this.props;
    const { isOpen, id } = this.state;
    const targetId = `tooltip-${id}`;

    return (
      <span>
        <span id={targetId}>{target}</span>
        <Tooltip
          placement={placement}
          isOpen={isOpen}
          target={targetId}
          toggle={this.toggle}
        >
          {children}
        </Tooltip>
      </span>
    );
  }
}

UITooltip.propTypes = {
  target: PropTypes.any,
  children: PropTypes.any,
  placement: PropTypes.oneOf([
    'top',
    'bottom',
    'left',
    'right',
    'top left',
    'top center',
    'top right',
    'right top',
    'right middle',
    'right bottom',
    'bottom right',
    'bottom center',
    'bottom left',
    'left top',
    'left middle',
    'left bottom',
  ]),
};

export default UITooltip;
