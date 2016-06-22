import Navbar from '../components/Navbar';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  shouldShowNavs: state.session.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  login: () => dispatch({ type: 'LOGIN' }),
  logout: () => dispatch({ type: 'LOGOUT' }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
