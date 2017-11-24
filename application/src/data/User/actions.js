
import api from './api';

export const USER_LOGGED_IN = 'auth.USER_LOGGED_IN';
export const USER_LOGGED_OUT = 'auth.USER_LOGGED_OUT';

export const userLoggedIn = token => ({
  type: USER_LOGGED_IN,
  token,
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT,
});

// Async actions

export const login = credentials => dispatch =>
  api.login(credentials)
    .then((token) => {
      dispatch(userLoggedIn(token));
    });

export const logout = () => (dispatch) => {
  dispatch(userLoggedOut());
};

export const register = data => dispatch =>
  api.register(data).then((token) => {
    dispatch(userLoggedIn(token));
  });

export const resetPasswordRequest = ({ email }) => () =>
  api.user.resetPasswordRequest(email);

export const resetPassword = data => () =>
  api.user.resetPassword(data);
