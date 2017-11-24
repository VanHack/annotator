
import api from './api';

export const USER_LOGGED_IN = 'auth.USER_LOGGED_IN';
export const USER_LOGGED_OUT = 'auth.USER_LOGGED_OUT';

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user,
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT,
});

// Async actions

export const login = () => dispatch =>
  api.login()
    .then((user) => {
      dispatch(userLoggedIn(user));
    });

export const logout = () => (dispatch) => {
  dispatch(userLoggedOut());
};
