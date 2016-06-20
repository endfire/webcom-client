import React, { PropTypes, Component, Children, cloneElement } from 'react';
import { findDOMNode } from 'react-dom';
import Dropdown from '../../components/Dropdown';

class UIDropdown extends Component {
  static propTypes = {
    children: PropTypes.any,
    button: PropTypes.bool,
  }

  constructor() {
    super();

    this.state = { open: false };
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.openDropdown = this.openDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick);
  }

  componentWillUnmount() {
    document.removeListener('click', this.handleDocumentClick);
  }

  toggleDropdown() {
    return this.state.open
      ? this.closeDropdown()
      : this.openDropdown();
  }

  openDropdown() {
    this.setState({ open: true });
  }

  closeDropdown() {
    this.setState({ open: false });
  }

  handleDocumentClick(e) {
    const { target } = e;
    const container = findDOMNode(this);

    if (container.contains(target) && container !== target) return;

    this.closeDropdown();
  }

  renderChildren() {
    const { children } = this.props;
    let isFirstChild = true;

    return Children.map(children, child => {
      if (isFirstChild) {
        this.firstChild = child;
        isFirstChild = false;

        return cloneElement(child, {
          onClick: this.toggleDropdown,
          isDropdown: true,
        });
      }

      return child;
    });
  }

  render() {
    const { open } = this.state;

    return (
      <Dropdown open={open}>
        {this.renderChildren()}
      </Dropdown>
    );
  }
}

export default UIDropdown;
