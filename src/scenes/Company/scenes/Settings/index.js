import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'paintcan';
import {
  UPDATE_FORM,
  INITIALIZE_FORM,
  CHANGE_CURRENT_FORM,
  REVERT_FORM,
} from '../../../../actionTypes';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // FIXME: Need to obtain id from state.session (auth)
    this.props.initializeForm('1');
  }

  handleCancel() {
    this.props.revertForm();
  }

  handleSubmit(e) {
    e.preventDefault();

    const { isUpdateLoading, updateSettings, current } = this.props;

    if (isUpdateLoading) return;

    // FIXME: Need to obtain id from state.session (auth)
    updateSettings('1', {
      name: current.get('name'),
      street: current.get('street'),
      city: current.get('city'),
      state: current.get('state'),
      zip: current.get('zip'),
      phone: current.get('phone'),
      url: current.get('url'),
      email: current.get('email'),
      description: current.get('description'),
    });
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.props.changeCurrentForm({
      key: name,
      value,
    });
  }

  render() {
    const { handleSubmit, handleChange, handleCancel } = this;
    const { current } = this.props;

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
                value={current.get('name')}
              /><br />
              <label htmlFor="street">Street</label><br />
              <input
                type="text"
                id="street"
                name="street"
                onChange={handleChange}
                value={current.get('street')}
              /><br />
              <label htmlFor="city">City</label><br />
              <input
                type="text"
                id="city"
                name="city"
                onChange={handleChange}
                value={current.get('city')}
              /><br />
              <label htmlFor="state">State</label><br />
              <input
                type="text"
                id="state"
                name="state"
                onChange={handleChange}
                value={current.get('state')}
              /><br />
              <label htmlFor="zip">Zip</label><br />
              <input
                type="text"
                id="zip"
                name="zip"
                onChange={handleChange}
                value={current.get('zip')}
              /><br />
              <label htmlFor="phone">Phone Number</label><br />
              <input
                type="text"
                id="phone"
                name="phone"
                onChange={handleChange}
                value={current.get('phone')}
              /><br />
              <label htmlFor="url">URL</label><br />
              <input
                type="text"
                id="url"
                name="url"
                onChange={handleChange}
                value={current.get('url')}
              /><br />
              <label htmlFor="email">Email</label><br />
              <input
                type="text"
                id="email"
                name="email"
                onChange={handleChange}
                value={current.get('email')}
              /><br />
              <label htmlFor="description">Description</label><br />
              <input
                type="text"
                id="description"
                name="description"
                onChange={handleChange}
                value={current.get('description')}
              />
            </Col>
          </Row>
        </form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isUpdateLoading: state.store.getIn(['isLoading', 'UPDATE']),
  original: state.form.get('original'),
  current: state.form.get('current'),
});

const mapDispatchToProps = (dispatch) => ({
  updateSettings: (id, data) => dispatch({
    type: UPDATE_FORM,
    payload: {
      type: 'company',
      id,
      data,
    },
  }),
  initializeForm: (id) => dispatch({
    type: INITIALIZE_FORM,
    payload: {
      type: 'company',
      field: 'companies',
      id,
    },
  }),
  changeCurrentForm: (payload) => dispatch({
    type: CHANGE_CURRENT_FORM,
    payload,
  }),
  revertForm: () => dispatch({
    type: REVERT_FORM,
  }),
});

Settings.propTypes = {
  isUpdateLoading: PropTypes.bool,
  original: PropTypes.object,
  current: PropTypes.object,
  updateSettings: PropTypes.func,
  initializeForm: PropTypes.func,
  changeCurrentForm: PropTypes.func,
  revertForm: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
