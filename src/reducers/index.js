export default (state = { data: [] }, action) => {
  if (action.type === 'INCREMENT') {
    return {
      data: [
        ...state.data,
        action.label,
      ],
    };
  }

  return state;
};
