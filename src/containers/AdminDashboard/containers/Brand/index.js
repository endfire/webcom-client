import { connect } from 'react-redux';
import Brand from './components/Brand';

const mapStateToProps = (state, ownProps) => ({
  brand: state.store.entities.brands[ownProps.params.id],
});

const mapDispatchToProps = (dispatch) => ({
  fetchBrand: (id) => dispatch({
    type: 'FETCH_REQUEST',
    payload: {
      type: 'brand',
      id,
    },
  }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Brand);
