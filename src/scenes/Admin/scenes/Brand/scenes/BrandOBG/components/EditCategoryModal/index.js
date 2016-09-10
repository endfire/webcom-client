import React, { PropTypes, Component } from 'react';
import { Button, ButtonGroup, withModal } from 'paintcan';
import listItem from 'styles/listItem';
import { ModalDialog } from 'components';

const EditCategoryModal = withModal(
  ({ isOpen, openModal, item }) => (
    <p active={isOpen} onClick={openModal} style={listItem}>
      {item.get('name')}
    </p>
  ),
  ({ closeModal, item, updateCategory, isUpdateLoading }) => (
    <EditCategoryDialog
      closeModal={closeModal}
      category={item}
      updateCategory={updateCategory}
      isUpdateLoading={isUpdateLoading}
    />
  ),
);

class EditCategoryDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.category.get('name'),
      heading: props.category.get('heading'),
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { isUpdateLoading, updateCategory, closeModal } = this.props;
    const id = this.props.category.get('id');
    const { name, heading } = this.state;

    if (isUpdateLoading) return;

    updateCategory(id, {
      name,
      heading,
    });
    closeModal();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { handleSubmit, handleChange } = this;
    const { category, closeModal } = this.props;

    return (
      <ModalDialog title={`Edit ${category.get('name')}`} size="sm" closeModal={closeModal}>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor="name">Name</label><br />
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={this.state.name}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="heading">Heading</label><br />
            <input
              type="text"
              id="heading"
              name="heading"
              onChange={handleChange}
              value={this.state.heading}
            />
          </fieldset>
          <fieldset>
            <ButtonGroup spaced>
              <Button type="submit" color="primary">
                Submit
              </Button>
              <Button type="button" color="danger" onClick={closeModal}>
                Cancel
              </Button>
            </ButtonGroup>
          </fieldset>
        </form>
      </ModalDialog>
    );
  }
}

EditCategoryDialog.propTypes = {
  closeModal: PropTypes.func,
  updateCategory: PropTypes.func,
  isUpdateLoading: PropTypes.bool,
  category: PropTypes.object,
};

export default EditCategoryModal;
