import React, { PropTypes, Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

class UIButtonDropdown extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = { isOpen: false };
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { text, caret, children } = this.props;

    return (
      <ButtonDropdown isOpen={this.state.isOpen} toggle={this.toggle}>
        <DropdownToggle caret={caret}>
          {text}
        </DropdownToggle>
        <DropdownMenu>
          {children}
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

UIButtonDropdown.propTypes = {
  text: PropTypes.string,
  caret: PropTypes.bool,
  children: PropTypes.any,
};

UIButtonDropdown.defaultProps = {
  caret: false,
};

export default UIButtonDropdown;
