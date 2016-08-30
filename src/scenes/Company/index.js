import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'paintcan';
import { Link } from 'react-router';
import { getSessionID } from 'selectors/company';
import * as types from 'constants/actionTypes';
import * as actions from 'actions/store';

class Company extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    const { fetchCompany, companyID } = this.props;

    fetchCompany(companyID);
  }

  handleLogout() {
    this.props.logoutRequest();
  }

  render() {
    return (
      <div>
        <Container fluid style={{ backgroundColor: 'yellow' }}>
          <Row>
            <Col size={{ xs: 2 }} align={{ xs: 'center' }}>
              <Link to="/company">Webcom</Link>
            </Col>
            <Col size={{ xs: 1 }} align={{ xs: 'center' }}>
              <Link to="/company/listings">Listings</Link>
            </Col>
            <Col size={{ xs: 1 }} align={{ xs: 'center' }}>
              <Link to="/company/people">People</Link>
            </Col>
            <Col size={{ xs: 1 }} align={{ xs: 'center' }}>
              <Link to="/company/settings">Settings</Link>
            </Col>
            <Col size={{ xs: 6 }} align={{ xs: 'center' }}>
              <Button onClick={this.handleLogout}>Logout</Button>
            </Col>
          </Row>
        </Container>

        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  companyID: getSessionID(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchCompany: (companyID) => dispatch(actions.fetchRecord('company', companyID)),
  logoutRequest: () => dispatch({
    type: types.LOGOUT_REQUEST,
    payload: '/company-login',
  }),
});

Company.propTypes = {
  companyID: PropTypes.string,
  children: PropTypes.any,
  fetchCompany: PropTypes.func,
  logoutRequest: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Company);
