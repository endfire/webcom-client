import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'paintcan';
import { FETCH_REQUEST, UPDATE_REQUEST } from '../../../../actionTypes';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
      url: '',
      email: '',
      description: '',
      originalInput: {},
      flag: true,
    };

    this.fetch = this.fetch.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.flag) return;

    const { name, street, city, state, zip, phone, url, email, description } = nextProps.company;

    this.setState({
      name,
      street,
      city,
      state,
      zip,
      phone,
      url,
      email,
      description,
      flag: false,
      original: {
        name,
        street,
        city,
        state,
        zip,
        phone,
        url,
        email,
        description,
      },
    });
  }

  fetch() {
    const { fetchCompany } = this.props;
    fetchCompany('1'); // FIXME: Need to obtain id from state.session (auth)
  }

  handleCancel() {
    const { name, street, city, state, zip, phone, url, email, description } = this.state.original;

    this.setState({
      name,
      street,
      city,
      state,
      zip,
      phone,
      url,
      email,
      description,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { isUpdateLoading, updateSettings, company } = this.props;
    const { name, street, city, state, zip, phone, url, email, description } = this.state;

    if (isUpdateLoading) return;

    updateSettings(company.id, {
      name,
      street,
      city,
      state,
      zip,
      phone,
      url,
      email,
      description,
    });

    this.setState({ flag: true });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { handleSubmit, handleChange, handleCancel } = this;

    return (
      <Container fluid><br />
        <form onSubmit={handleSubmit}>
          <Row>
            <Col size={{ xs: 4, lg: 1 }} align={{ xs: 'start' }}>
              <Button type="submit">Save</Button>
            </Col>
            <Col size={{ xs: 4, lg: 1 }} align={{ xs: 'start' }}>
              <Button onClick={handleCancel}>Cancel</Button>
            </Col>
          </Row><br />
          <Row>
            <Col size={{ xs: 10, lg: 4 }} align={{ xs: 'start' }}>
              <label htmlFor="name">Name of Company</label><br />
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                value={this.state.name}
              /><br />
              <label htmlFor="street">Street</label><br />
              <input
                type="text"
                id="street"
                name="street"
                onChange={handleChange}
                value={this.state.street}
              /><br />
              <label htmlFor="city">City</label><br />
              <input
                type="text"
                id="city"
                name="city"
                onChange={handleChange}
                value={this.state.city}
              /><br />
              <label htmlFor="state">State</label><br />
              <input
                type="text"
                id="state"
                name="state"
                onChange={handleChange}
                value={this.state.state}
              /><br />
              <label htmlFor="zip">Zip</label><br />
              <input
                type="text"
                id="zip"
                name="zip"
                onChange={handleChange}
                value={this.state.zip}
              /><br />
              <label htmlFor="phone">Phone Number</label><br />
              <input
                type="text"
                id="phone"
                name="phone"
                onChange={handleChange}
                value={this.state.phone}
              /><br />
              <label htmlFor="url">URL</label><br />
              <input
                type="text"
                id="url"
                name="url"
                onChange={handleChange}
                value={this.state.url}
              /><br />
              <label htmlFor="email">Email</label><br />
              <input
                type="text"
                id="email"
                name="email"
                onChange={handleChange}
                value={this.state.email}
              /><br />
              <label htmlFor="description">Description</label><br />
              <input
                type="text"
                id="description"
                name="description"
                onChange={handleChange}
                value={this.state.description}
              />
            </Col>
          </Row>
        </form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isUpdateLoading: state.store.isLoading.UPDATE,
  company: state.store.entities.companies['1'],
  // FIXME: The id of the company will be obtained from the session/auth state (not hardcoded)
});

const mapDispatchToProps = (dispatch) => ({
  fetchCompany: (id) => dispatch({
    type: FETCH_REQUEST,
    payload: {
      type: 'company',
      id,
    },
  }),
  updateSettings: (id, data) => dispatch({
    type: UPDATE_REQUEST,
    payload: {
      type: 'company',
      id,
      data,
    },
  }),
});

Settings.propTypes = {
  isUpdateLoading: PropTypes.bool,
  company: PropTypes.object,
  fetchCompany: PropTypes.func,
  updateSettings: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
