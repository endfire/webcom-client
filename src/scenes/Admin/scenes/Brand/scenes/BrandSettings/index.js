import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'paintcan';
import {
  UPDATE_FORM,
  INITIALIZE_FORM,
  CURRENT_FORM_CHANGE,
  REVERT_FORM,
} from '../../../../../../actionTypes';

class BrandSettings extends Component {
  constructor(props) {
    super(props);

    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { initializeForm, params: { id } } = this.props;

    initializeForm(id);
  }

  handleCancel() {
    this.props.revertForm();
  }

  handleSubmit(e) {
    e.preventDefault();

    const { isUpdateLoading, updateSettings, current, params: { id } } = this.props;

    if (isUpdateLoading) return;

    updateSettings(id, {
      name: current.get('name'),
      background: current.get('background'),
      text: current.get('text'),
      secondary: current.get('secondary'),
      // TODO: need to upload picture
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
              <label htmlFor="background">Background Color</label><br />
              <input
                type="text"
                id="background"
                name="background"
                onChange={handleChange}
                value={current.get('background')}
              /><br />
              <label htmlFor="text">Text Color</label><br />
              <input
                type="text"
                id="text"
                name="text"
                onChange={handleChange}
                value={current.get('text')}
              /><br />
              <label htmlFor="secondary">Secondary Color</label><br />
              <input
                type="text"
                id="secondary"
                name="secondary"
                onChange={handleChange}
                value={current.get('secondary')}
              /><br />
            </Col>
          </Row>
        </form>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  brand: state.store.getIn(['entities', 'brands', ownProps.params.id]),
  isUpdateLoading: state.store.getIn(['isLoading', 'UPDATE']),
  original: state.form.get('original'),
  current: state.form.get('current'),
});

const mapDispatchToProps = (dispatch) => ({
  updateSettings: (id, data) => dispatch({
    type: UPDATE_FORM,
    payload: {
      type: 'brand',
      id,
      data,
    },
  }),
  initializeForm: (id) => dispatch({
    type: INITIALIZE_FORM,
    payload: {
      type: 'brand',
      field: 'brands',
      id,
    },
  }),
  changeCurrentForm: (payload) => dispatch({
    type: CURRENT_FORM_CHANGE,
    payload,
  }),
  revertForm: () => dispatch({
    type: REVERT_FORM,
  }),
});

BrandSettings.propTypes = {
  params: PropTypes.object,
  brand: PropTypes.string,
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
)(BrandSettings);
