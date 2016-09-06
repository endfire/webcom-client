import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'paintcan';
import { Link } from 'react-router';
import { getCurrentCompany } from 'selectors/adminCompanies';
import * as actions from 'actions/store';

class CompanyOne extends Component {
  componentDidMount() {
    const { fetchCompany, params: { companyID } } = this.props;

    fetchCompany(companyID);
  }

  render() {
    const { children, company, params: { companyID } } = this.props;

    return (
      <div>
        <Container fluid style={{ backgroundColor: 'yellow' }}>
          <Row>
            <Col size={{ xs: 2 }} align={{ xs: 'center' }}>
              {company ? company.get('name') : 'Loading...'}
            </Col>
            <Col size={{ xs: 1 }} align={{ xs: 'center' }}>
              <Link to={`/admin/companies/${companyID}/listings`}>Listings</Link>
            </Col>
            <Col size={{ xs: 1 }} align={{ xs: 'center' }}>
              <Link to={`/admin/companies/${companyID}/ads`}>Ads</Link>
            </Col>
            <Col size={{ xs: 1 }} align={{ xs: 'center' }}>
              <Link to={`/admin/companies/${companyID}/people`}>People</Link>
            </Col>
            <Col size={{ xs: 1 }} align={{ xs: 'center' }}>
              <Link to={`/admin/companies/${companyID}/info`}>Information</Link>
            </Col>
          </Row>
        </Container>

        {children}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  company: getCurrentCompany(ownProps.params.companyID)(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchCompany: (id) => dispatch(actions.fetchRecord('company', id)),
});

CompanyOne.propTypes = {
  children: PropTypes.any,
  params: PropTypes.object,
  company: PropTypes.object,
  fetchCompany: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompanyOne);
