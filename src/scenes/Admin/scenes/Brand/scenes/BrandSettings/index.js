

/*
// maybe put these in Brand index.js
const mapStateToProps = (state) => ({
  isUpdateLoading: state.store.getIn(['isLoading', 'UPDATE']),
});

const mapDispatchToProps = (dispatch) => ({
  updateBrand: (id, data) => dispatch({
    type: UPDATE_REQUEST,
    payload: {
      type: 'person',
      id,
      data,
    },
  }),
});

someComponent.propTypes = {
  updateBrand: PropTypes.func,
  isUpdateLoading: PropTypes.bool,
};
*/
