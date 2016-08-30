import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'paintcan';
import * as actions from 'actions/store';

class BrandForm extends Component {
  constructor(props) {
    super(props);

    this.handleAddField = this.handleAddField.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
  }

  componentDidMount() {
    const { fetchForm, params: { formID } } = this.props;

    fetchForm(formID);
  }

  handleAddField() {
    console.log('handleAddField');
  }

  handleSave() {
    console.log('handleSave');
  }

  handlePublish() {
    console.log('handlePublish');
  }

  render() {
    const { form } = this.props;
    const { handleAddField, handleSave, handlePublish } = this;

    return (
      <Container fluid><br />
        <Row>
          <Col size={{ xs: 2 }} align={{ xs: 'start' }}>
            <h4>{form.get('name')}</h4>
          </Col>
          <Col size={{ xs: 2 }} align={{ xs: 'start' }}>
            <Button onClick={handleAddField}>Add field</Button>
          </Col>
          <Col size={{ xs: 2 }} align={{ xs: 'end' }}>
            <Button onClick={handleSave}>Save changes</Button>
          </Col>
          <Col size={{ xs: 2 }} align={{ xs: 'end' }}>
            <Button onClick={handlePublish}>Publish this form</Button>
          </Col>
        </Row>
        <Row>
          <Col size={{ xs: 4 }} align={{ xs: 'start' }}>
            {form ? <p>form is here</p> : 'Loading...'}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  form: state.store.getIn(['entities', 'forms', ownProps.params.formID]),
});

const mapDispatchToProps = (dispatch) => ({
  fetchForm: (id) => dispatch(actions.fetchRecord('form', id)),
});

BrandForm.propTypes = {
  params: PropTypes.object,
  form: PropTypes.object,
  fetchForm: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BrandForm);
