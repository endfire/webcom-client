import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'paintcan';
import { Link } from 'react-router';
import * as actions from 'actions/store';

class Brand extends Component {
  componentDidMount() {
    const { fetchBrand, params: { brandID } } = this.props;

    fetchBrand(brandID);
  }

  render() {
    const { children, brand, params: { brandID } } = this.props;

    return (
      <div>
        <Container fluid style={{ backgroundColor: 'yellow' }}>
          <Row>
            <Col size={{ xs: 2 }} align={{ xs: 'center' }}>
              {brand ? brand.get('name') : 'Loading...'}
            </Col>
            <Col size={{ xs: 1 }} align={{ xs: 'center' }}>
              <Link to={`/admin/brands/${brandID}/forms`}>Forms</Link>
            </Col>
            <Col size={{ xs: 1 }} align={{ xs: 'center' }}>
              <Link to={`/admin/brands/${brandID}/OBG`}>OBG</Link>
            </Col>
            <Col size={{ xs: 1 }} align={{ xs: 'center' }}>
              <Link to={`/admin/brands/${brandID}/settings`}>Settings</Link>
            </Col>
          </Row>
        </Container>

        {children}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  brand: state.store.getIn(['entities', 'brands', ownProps.params.brandID]),
});

const mapDispatchToProps = (dispatch) => ({
  fetchBrand: (id) => dispatch(actions.fetchRecord('brand', id)),
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
