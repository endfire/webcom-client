import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'paintcan';
import { Link } from 'react-router';
import { FETCH_REQUEST } from '../../../../actionTypes';

class Brand extends Component {
  componentDidMount() {
    const { fetchBrand, params: { id } } = this.props;

    fetchBrand(id);
  }

  render() {
    const { children, brand, params: { id } } = this.props;

    return (
      <div>
        <Container fluid style={{ backgroundColor: 'yellow' }}>
          <Row>
            <Col size={{ xs: 2 }} align={{ xs: 'center' }}>
              {brand ? brand.get('name') : 'Loading...'}
            </Col>
            <Col size={{ xs: 1 }} align={{ xs: 'center' }}>
              <Link to={`/admin/brands/${id}/forms`}>Forms</Link>
            </Col>
            <Col size={{ xs: 1 }} align={{ xs: 'center' }}>
              <Link to={`/admin/brands/${id}/OBG`}>OBG</Link>
            </Col>
            <Col size={{ xs: 1 }} align={{ xs: 'center' }}>
              <Link to={`/admin/brands/${id}/settings`}>Settings</Link>
            </Col>
          </Row>
        </Container>

        {children}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  brand: state.store.getIn(['entities', 'brands', ownProps.params.id]),
});

const mapDispatchToProps = (dispatch) => ({
  fetchBrand: (id) => dispatch({
    type: FETCH_REQUEST,
    payload: {
      type: 'brand',
      id,
    },
  }),
});

Brand.propTypes = {
  children: PropTypes.any,
  params: PropTypes.object,
  brand: PropTypes.object,
  fetchBrand: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Brand);
