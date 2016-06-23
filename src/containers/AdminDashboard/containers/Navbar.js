import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Navbar from '../components/Navbar';

const mapStateToProps = state => ({
  shouldShowNavs: state.session.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  login: () => dispatch({ type: 'LOGIN' }),
  logout: () => dispatch({ type: 'LOGOUT' }),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar));
