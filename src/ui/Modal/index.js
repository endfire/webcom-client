import React, { PropTypes, Component } from 'react';
import Modal from '../../components/Modal';
import Button from '../../components/Button';

class UIModal extends Component {
  constructor() {
    super();

    this.state = { open: false };
    this.toggleModal = this.toggleModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick);
  }

  componentWillUnmount() {
    document.removeListener('click', this.handleDocumentClick);
  }

  toggleModal() {
    return this.state.open
      ? this.closeModal()
      : this.openModal();
  }

  closeModal() {
    document.body.removeChild(this.backdrop);
    this.setState({ open: false });
  }

  openModal() {
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop fade in';
    document.body.appendChild(backdrop);

    this.backdrop = backdrop;
    this.setState({ open: true });
  }

  handleDocumentClick(e) {
    const { open } = this.state;

    if (!open) return;

    const { target } = e;

    // TODO: Very hacky. Needs to only close if clicked outside `modal-dialog`
    if (target.className === 'modal fade in') this.closeModal();
  }

  render() {
    const { open } = this.state;
    const { children, type, text, size } = this.props;

    return (
      <div>
        <Button type={type} text={text} size={size} onClick={this.toggleModal} />
        <Modal open={open}>
          {children}
        </Modal>
      </div>
    );
  }
}

UIModal.propTypes = {
  children: PropTypes.any,
  type: PropTypes.string,
  text: PropTypes.string,
  size: PropTypes.string,
};

export default UIModal;
