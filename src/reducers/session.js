const init = {
  isLoggedIn: false,
  userId: '',
  token: '',
};

export default (state = init, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        isLoggedIn: true,
        userId: 'test',
        token: 'test',
      };
    case 'LOGOUT':
      return {
        isLoggedIn: false,
        userId: '',
        token: '',
      };
    default:
      return state;
  }
};
