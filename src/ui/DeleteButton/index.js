import React, { PropTypes, Component } from 'react';
import DeleteButton from '../../components/DeleteButton';
import DeleteModal from '../../components/DeleteModal';

class UIDeleteButton extends Component {
  constructor() {
    super();

    this.state = { isOpen: false };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { isOpen } = this.state;
    const { onSuccess, onCancel, text } = this.props;
    const toggle = this.toggleModal;

    let success = onSuccess === 'close' ? toggle : onSuccess;
    let cancel = onCancel === 'close' ? toggle : onCancel;

    return (
      <span>
        <DeleteButton onClick={toggle} />
        <DeleteModal
          isOpen={isOpen}
          onSuccess={success}
          onCancel={cancel}
          onToggle={toggle}
          text={text}
        />
      </span>
    );
  }
}

UIDeleteButton.propTypes = {
  text: PropTypes.string.isRequired,
  onSuccess: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]).isRequired,
  onCancel: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]).isRequired,
};

export default UIDeleteButton;
