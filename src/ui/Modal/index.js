import React, { PropTypes, Component, Children, cloneElement } from 'react';
import { Modal } from 'reactstrap';

class UIModal extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  cloneWithToggle(element) {
    return cloneElement(element, { toggle: this.toggle });
  }

  renderChildren() {
    const { children } = this.props;
    const { map, toArray } = Children;

    return map(toArray(children), child => {
      if (child.props.hasToggle) {
        return this.cloneWithToggle(child);
      }

      return child;
    });
  }

  render() {
    const { target, size } = this.props;
    const { isOpen } = this.state;

    return (
      <div>
        <span onClick={this.toggle}>{target}</span>
        <Modal isOpen={isOpen} size={size} toggle={this.toggle}>
          {this.renderChildren()}
        </Modal>
      </div>
    );
  }
}

UIModal.propTypes = {
  children: PropTypes.any,
  target: PropTypes.any,
  size: PropTypes.string,
};

export default UIModal;
