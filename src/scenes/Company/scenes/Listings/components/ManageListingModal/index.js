import React, { PropTypes, Component } from 'react';
import { Button, Card, Container, Row, Col, withModal } from 'paintcan';
import Select from 'react-select';

const ManageListingsModal = withModal(
  ({ isOpen, openModal, item }) => (
    <Button active={isOpen} onClick={openModal} color="primary">
      {item.get('brand')}
    </Button>
  ),
  ({ closeModal, item, updateListing, isUpdateLoading }) => (
    <EditListingDialog
      closeModal={closeModal}
      listing={item}
      updateListing={updateListing}
      isUpdateLoading={isUpdateLoading}
    />
  ),
);

class EditListingDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.listing.get('name'),
      email: props.listing.get('email'),
      phone: props.listing.get('phone'),
      job: props.listing.get('job'),
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleJobSelect = this.handleJobSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { isUpdateLoading, updateListing, closeModal } = this.props;
    const id = this.props.listing.get('id');
    const { name, email, phone, job } = this.state;

    if (isUpdateLoading) return;

    updateListing(id, {
      name,
      email,
      phone,
      job,
    });
    closeModal();
  }

  handleJobSelect(item) {
    this.setState({ job: item.label });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { handleSubmit, handleChange, handleJobSelect } = this;
    const { listing, closeModal } = this.props;

    return (
      // this could be a presentational component that is a sibling in this 'components' folder
      <Container fluid>
        <Row align={{ xs: 'center' }}>
          <Col size={{ xs: 10, lg: 4 }} align={{ xs: 'start' }}>
            <Card>
              <h3>Edit {listing.name}</h3>
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={this.state.name}
                /><br />
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={this.state.email}
                /><br />
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  onChange={handleChange}
                  value={this.state.phone}
                /><br />
                <label>Job Title</label>
                <input
                  type="text"
                  id="job"
                  name="job"
                  hidden
                  value={this.state.job}
                />
                <JobSelect
                  handleJobSelect={handleJobSelect}
                  item={{ label: this.state.job }}
                /><br /><br />
                <Button type="submit">Save Change</Button>
              </form>
              <Button onClick={closeModal}>
                Cancel
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

EditListingDialog.propTypes = {
  closeModal: PropTypes.func,
  updateListing: PropTypes.func,
  isUpdateLoading: PropTypes.bool,
  listing: PropTypes.object,
};

export default ManageListingsModal;
